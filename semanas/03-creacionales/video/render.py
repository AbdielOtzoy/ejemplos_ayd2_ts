#!/usr/bin/env python3
"""Render the local Spanish Factory Method lesson video."""

from __future__ import annotations

import math
import shutil
import subprocess
import textwrap
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
WORK = ROOT / ".render"
WIDTH, HEIGHT, FPS, RATE = 1280, 720, 25, 48_000
VOICE = "Paulina"
GAP = 0.22
LEAD = 0.65
TAIL = 1.35
BG = (10, 16, 32)
PANEL = (19, 29, 51)
PANEL_LIGHT = (27, 41, 68)
INK = (239, 246, 255)
MUTED = (157, 177, 207)
TEAL = (99, 226, 212)
CORAL = (255, 139, 112)
GOLD = (255, 204, 120)
BLUE = (119, 173, 255)

SCENES = [
    ("Introducción", "Factory\nMethod", "Crear objetos sin\nacoplar el servicio.", "hero", "Título sobre un fondo nocturno; los canales Email y SMS aparecen como opciones de producto."),
    ("El problema", "Un if que\ncrece", "Cada variante entra\na la misma clase.", "problem", "Un servicio acumula ramas para construir Email y SMS; cada canal añade otra dependencia."),
    ("La idea", "Delegar la\ncreación", "El flujo común queda.\nLa elección cambia.", "factory", "El creador conserva avisar y delega crearNotificacion a una subclase."),
    ("Participantes", "Roles del\npatrón", "Creador → fábrica →\nproducto.", "roles", "Diagrama de clases: creador abstracto arriba y creadores concretos debajo."),
    ("Producto", "Un contrato\ncomún", "Los productos comparten\nuna operación.", "products", "Notificacion declara enviar; Email y SMS implementan el mismo contrato."),
    ("Recorrido", "Avisar no crea\nel canal", "La operación común llama\na la fábrica.", "sequence", "Secuencia cliente → creador → método de fábrica → producto → enviar."),
    ("Dos variantes", "Dos creadores,\nun flujo", "CreadorEmail y CreadorSms\nresuelven la elección.", "compare", "Dos creadores concretos producen productos distintos y comparten avisar."),
    ("Extensión", "Sumar un canal", "Agrega producto y creador;\nconserva el contrato.", "extend", "WhatsApp se incorpora como par de clases nuevas que respetan Notificacion."),
    ("Cuándo usarlo", "Cuándo conviene", "Variar la creación y\nmantener estable el uso.", "good", "Tres señales para elegir Factory Method: familias previstas, interfaz común y operación estable."),
    ("Límite", "El costo también\ncuenta", "Más flexibilidad trae\nmás clases.", "tradeoff", "La jerarquía de creadores tiene un costo; una fábrica simple puede bastar en casos pequeños."),
    ("Resumen", "En una frase", "El creador define el flujo;\nla subclase elige el producto.", "summary", "Recap visual de interfaz, método de fábrica, creador concreto y operación común."),
]

CUES = [
    (0, "Cuando una aplicación necesita enviar una notificación, ¿quién decide si debe crear un correo o un SMS? Esa decisión parece pequeña, hasta que aparecen más canales."),
    (0, "Factory Method organiza la creación: CreadorNotificacion conserva el flujo común y trabaja con la interfaz Notificacion."),
    (1, "Imaginemos que el método avisar contiene un if para Email y otro para SMS. En cada rama, el servicio construye una clase concreta."),
    (1, "Ahora esa clase conoce los canales, los constructores y quizá sus detalles de configuración. La lógica de negocio empieza a depender de cada proveedor."),
    (1, "Cada canal nuevo obliga a tocar esa misma clase. Si el proyecto crece, el if se extiende y una modificación puede afectar rutas que ya funcionaban."),
    (2, "Factory Method propone mover la decisión de creación a un método de fábrica. El creador conserva una operación común, pero no construye el producto directamente."),
    (2, "Una clase creadora declara ese método; sus subclases lo redefinen para elegir qué notificación concreta entregar."),
    (2, "Así, el flujo de envío permanece en un lugar, y la elección del producto cambia mediante el creador."),
    (3, "En el ejemplo, Notificacion es la interfaz del producto. Declara enviar con un mensaje; avisar trabaja con ese contrato."),
    (3, "EmailNotificacion y SmsNotificacion son productos concretos. Cada uno implementa enviar, aunque el canal real de entrega cambia."),
    (3, "CreadorNotificacion es el creador. Define crearNotificacion y también la operación avisar, que contiene el trabajo común."),
    (4, "En TypeScript, crearNotificacion está marcado como abstracto y protegido. La clase base no elige un canal; obliga a cada subclase a decidirlo."),
    (4, "CreadorEmail redefine el método y devuelve un EmailNotificacion. CreadorSms hace lo mismo con SmsNotificacion."),
    (4, "El tipo de retorno es Notificacion, así avisar usa enviar sin preguntar qué clase concreta recibió."),
    (5, "Veamos el recorrido. El cliente crea un CreadorEmail y llama a avisar con el mensaje de confirmación del pedido."),
    (5, "Avisar invoca crearNotificacion. Esa llamada llega a CreadorEmail, que produce el objeto EmailNotificacion."),
    (5, "Después, avisar llama enviar sobre la interfaz Notificacion. El creador coordina la operación; el producto concreto realiza el envío."),
    (6, "Si el cliente usa CreadorSms, el mismo método avisar recorre la misma operación, pero el producto ahora es SmsNotificacion."),
    (6, "Por eso, el cliente cambia de canal al elegir otro creador. La operación de negocio no necesita ramas para Email y SMS."),
    (6, "En la demo, ambas llamadas muestran mensajes distintos en consola. En una aplicación real, enviar conectaría con el proveedor del canal."),
    (7, "Para sumar WhatsApp, crearíamos un producto WhatsAppNotificacion y un creador CreadorWhatsApp. Ambos respetan el contrato común."),
    (7, "El resto del flujo puede seguir usando avisar y enviar. Agregar un canal significa extender las clases, no meter otra rama allí."),
    (7, "Ojo: algún punto de entrada todavía debe elegir qué creador usar. Factory Method concentra la decisión; no la hace desaparecer."),
    (8, "Conviene cuando la clase usa productos de una interfaz, pero cada variante necesita una forma distinta de crearse."),
    (8, "También ayuda si esperamos nuevas variantes y queremos mantener estable la operación que trabaja con ellas."),
    (8, "Funciona mejor cuando los creadores concretos encajan con la estructura de herencia que ya tiene el diseño."),
    (9, "El costo es crear una jerarquía de creadores, y conservar al menos un punto del programa que conozca cuál instancia concreta elegir."),
    (9, "Si solo hay dos objetos muy simples y la lógica apenas cambia, una función de fábrica o un if pequeño puede resultar más directo."),
    (10, "Recuerda el recorrido: el creador declara el factory method, las subclases deciden el producto, y avisar llama a su interfaz común."),
    (10, "El patrón es útil para variar la creación sin dispersar las dependencias sobre clases concretas."),
]


def run(args: list[str]) -> None:
    subprocess.run(args, check=True)


def ffprobe_duration(path: Path) -> float:
    result = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(path),
    ], text=True)
    return float(result.strip())


def font(size: int, mono: bool = False) -> ImageFont.FreeTypeFont:
    path = "/System/Library/Fonts/Menlo.ttc" if mono else "/System/Library/Fonts/Avenir.ttc"
    return ImageFont.truetype(path, size)


def rounded(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill, outline=None, radius=22, width=2) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def label(draw: ImageDraw.ImageDraw, xy, value: str, size=22, color=INK, mono=False, anchor=None) -> None:
    draw.text(xy, value, font=font(size, mono), fill=color, anchor=anchor, spacing=7)


def card(draw, x, y, w, h, title, body="", accent=TEAL, title_size=23, body_size=18):
    rounded(draw, (x, y, x + w, y + h), PANEL, (46, 64, 95), 19, 2)
    draw.rounded_rectangle((x, y, x + 9, y + h), radius=5, fill=accent)
    label(draw, (x + 24, y + 18), title, title_size, INK, mono=True)
    if body:
        label(draw, (x + 24, y + 58), body, body_size, MUTED)


def arrow(draw, points, color=TEAL, width=4):
    draw.line(points, fill=color, width=width, joint="curve")
    x1, y1 = points[-2]
    x2, y2 = points[-1]
    angle = math.atan2(y2 - y1, x2 - x1)
    side = 12
    left = (x2 - side * math.cos(angle - math.pi / 6), y2 - side * math.sin(angle - math.pi / 6))
    right = (x2 - side * math.cos(angle + math.pi / 6), y2 - side * math.sin(angle + math.pi / 6))
    draw.polygon([(x2, y2), left, right], fill=color)


def draw_icon(draw, x, y, kind, color):
    if kind == "email":
        rounded(draw, (x, y, x + 92, y + 64), None, color, 12, 5)
        draw.line((x + 5, y + 8, x + 46, y + 39, x + 87, y + 8), fill=color, width=5)
    else:
        rounded(draw, (x, y, x + 82, y + 62), None, color, 18, 5)
        draw.polygon([(x + 22, y + 58), (x + 15, y + 78), (x + 44, y + 61)], fill=color)
        for dx in (26, 41, 56):
            draw.ellipse((x + dx, y + 27, x + dx + 5, y + 32), fill=color)


def diagram(draw, kind):
    if kind == "hero":
        label(draw, (890, 164), "MISMO CONTRATO", 17, MUTED, anchor="mm")
        card(draw, 663, 232, 230, 170, "Email", "CreadorEmail", TEAL)
        draw_icon(draw, 732, 311, "email", TEAL)
        card(draw, 944, 232, 230, 170, "SMS", "CreadorSms", CORAL)
        draw_icon(draw, 1016, 310, "sms", CORAL)
        arrow(draw, [(778, 403), (848, 446)], TEAL, 3)
        arrow(draw, [(1059, 403), (991, 446)], CORAL, 3)
        rounded(draw, (729, 449, 1108, 500), (23, 35, 61), None, 25)
        label(draw, (918, 474), "Notificacion", 20, GOLD, mono=True, anchor="mm")
    elif kind == "problem":
        card(draw, 653, 170, 510, 74, "Servicio.avisar(mensaje)", "", CORAL, 23)
        arrow(draw, [(900, 246), (900, 279)], CORAL)
        card(draw, 664, 286, 236, 94, "if email", "new EmailNotificacion()", CORAL, 20, 17)
        card(draw, 922, 286, 236, 94, "if sms", "new SmsNotificacion()", CORAL, 20, 17)
        arrow(draw, [(778, 391), (778, 420), (902, 420)], CORAL, 3)
        arrow(draw, [(1040, 391), (1040, 420), (920, 420)], CORAL, 3)
        rounded(draw, (743, 449, 1068, 500), (69, 37, 42), None, 23)
        label(draw, (905, 474), "acoplamiento directo", 18, (255, 184, 171), anchor="mm")
    elif kind == "factory":
        card(draw, 666, 177, 472, 100, "CreadorNotificacion", "avisar(mensaje)", BLUE)
        arrow(draw, [(902, 280), (902, 320)], TEAL)
        card(draw, 754, 327, 296, 80, "crearNotificacion()", "método de fábrica", GOLD, 21, 17)
        arrow(draw, [(902, 410), (902, 443)], TEAL)
        card(draw, 777, 451, 252, 58, "Notificacion", "", TEAL, 21)
    elif kind == "roles":
        card(draw, 813, 160, 300, 90, "CreadorNotificacion", "avisar + factory method", BLUE, 20, 16)
        arrow(draw, [(864, 255), (765, 306)], BLUE, 3)
        arrow(draw, [(1060, 255), (1110, 306)], BLUE, 3)
        card(draw, 643, 313, 244, 78, "CreadorEmail", "devuelve Email", TEAL, 20, 16)
        card(draw, 936, 313, 244, 78, "CreadorSms", "devuelve SMS", CORAL, 20, 16)
        rounded(draw, (743, 426, 1080, 492), (23, 35, 61), None, 22)
        label(draw, (911, 458), "subclases eligen el producto", 17, GOLD, anchor="mm")
    elif kind == "products":
        card(draw, 791, 163, 325, 90, "Notificacion", "enviar(mensaje)", GOLD, 23, 18)
        arrow(draw, [(864, 259), (770, 309)], GOLD, 3)
        arrow(draw, [(1040, 259), (1135, 309)], GOLD, 3)
        card(draw, 654, 316, 242, 106, "EmailNotificacion", "implementa enviar", TEAL, 18, 17)
        card(draw, 1011, 316, 242, 106, "SmsNotificacion", "implementa enviar", CORAL, 18, 17)
        label(draw, (953, 474), "interfaz compartida", 17, MUTED, anchor="mm")
    elif kind == "sequence":
        xs = [625, 750, 875, 1000, 1125]
        names = [("Cliente", BLUE), ("Creador", TEAL), ("Fábrica", GOLD), ("Producto", CORAL), ("Enviar", TEAL)]
        for x, (name, color) in zip(xs, names):
            rounded(draw, (x - 53, 195, x + 53, 252), PANEL_LIGHT, (48, 68, 100), 17)
            label(draw, (x, 223), name, 16, color, anchor="mm")
        for a, b in zip(xs, xs[1:]):
            arrow(draw, [(a + 54, 223), (b - 57, 223)], MUTED, 2)
        labels = ["elige", "avisar()", "crear()", "enviar()"]
        for x, text in zip([(a + b) // 2 for a, b in zip(xs, xs[1:])], labels):
            label(draw, (x, 270), text, 15, MUTED, mono=True, anchor="mm")
        for x in xs[1:5]:
            draw.line((x, 254, x, 390), fill=(55, 73, 104), width=2)
        arrow(draw, [(752, 339), (1125, 339)], TEAL, 4)
        label(draw, (934, 370), "regresa una implementación común", 17, TEAL, anchor="mm")
        card(draw, 768, 424, 373, 77, "EmailNotificacion", "enviar(mensaje)", CORAL, 18, 16)
    elif kind == "compare":
        card(draw, 654, 185, 256, 102, "CreadorEmail", "crear → Email", TEAL, 19, 18)
        card(draw, 958, 185, 256, 102, "CreadorSms", "crear → SMS", CORAL, 19, 18)
        arrow(draw, [(782, 301), (782, 351)], TEAL)
        arrow(draw, [(1086, 301), (1086, 351)], CORAL)
        card(draw, 667, 360, 229, 84, "avisar()", "enviar por Email", TEAL, 20, 17)
        card(draw, 971, 360, 229, 84, "avisar()", "enviar por SMS", CORAL, 20, 17)
        label(draw, (934, 476), "una operación · dos productos", 18, GOLD, anchor="mm")
    elif kind == "extend":
        card(draw, 800, 155, 268, 64, "Notificacion", "", GOLD, 20, 15)
        variants = [(690, TEAL, "Email", "EmailNotificacion"),
                    (892, CORAL, "SMS", "SmsNotificacion"),
                    (1094, BLUE, "WhatsApp", "WhatsAppNotificacion")]
        for x, color, title, product in variants:
            arrow(draw, [(934, 220), (x, 276)], color, 3)
            card(draw, x - 87, 286, 174, 112, title, product, color, 17, 13)
        rounded(draw, (735, 438, 1132, 490), (23, 35, 61), None, 22)
        label(draw, (933, 464), "+ CreadorWhatsApp", 18, GOLD, mono=True, anchor="mm")
    elif kind == "good":
        points = [
            ("01", "Interfaz común", "el servicio depende del contrato", TEAL),
            ("02", "Creación variable", "cada subtipo elige su producto", GOLD),
            ("03", "Flujo estable", "la operación principal se reutiliza", BLUE),
        ]
        for i, (num, title, body, color) in enumerate(points):
            y = 157 + i * 116
            rounded(draw, (662, y, 1183, y + 91), PANEL, (46, 64, 95), 19)
            label(draw, (700, y + 45), num, 22, color, mono=True, anchor="mm")
            label(draw, (743, y + 18), title, 21, INK)
            label(draw, (743, y + 52), body, 16, MUTED)
    elif kind == "tradeoff":
        card(draw, 657, 181, 236, 142, "A favor", "creación extensible\nmenos ramas en el uso", TEAL, 22, 18)
        card(draw, 948, 181, 236, 142, "Costo", "más clases\nherencia que mantener", CORAL, 22, 18)
        rounded(draw, (711, 378, 1133, 467), (28, 38, 59), None, 24)
        label(draw, (922, 406), "¿solo dos casos sencillos?", 17, MUTED, anchor="mm")
        label(draw, (922, 439), "una fábrica simple puede bastar", 18, GOLD, anchor="mm")
    else:
        steps = [("1", "Interfaz"), ("2", "Factory Method"), ("3", "Creador concreto"), ("4", "Enviar")]
        for i, (num, text) in enumerate(steps):
            y = 148 + i * 90
            color = [GOLD, BLUE, TEAL, CORAL][i]
            rounded(draw, (704, y, 1150, y + 65), PANEL, (46, 64, 95), 18)
            label(draw, (742, y + 32), num, 21, color, mono=True, anchor="mm")
            label(draw, (790, y + 16), text, 21, INK)
            if i < len(steps) - 1:
                arrow(draw, [(923, y + 68), (923, y + 84)], MUTED, 2)


def render_scene(index: int, scene) -> Path:
    _, title, note, diagram_kind, _ = scene
    image = Image.new("RGB", (WIDTH, HEIGHT))
    pixels = image.load()
    draw = ImageDraw.Draw(image)
    for y in range(HEIGHT):
        t = y / HEIGHT
        color = tuple(round(BG[i] * (1 - t) + (16, 27, 50)[i] * t) for i in range(3))
        draw.line((0, y, WIDTH, y), fill=color)
    for x in range(42, WIDTH, 56):
        for y in range(66, HEIGHT - 92, 56):
            draw.ellipse((x, y, x + 2, y + 2), fill=(28, 42, 66))

    label(draw, (72, 50), "PATRONES CREACIONALES", 16, TEAL)
    label(draw, (292, 50), "FACTORY METHOD", 16, MUTED, mono=True)
    draw.line((72, 81, 1208, 81), fill=(43, 59, 86), width=2)

    lines = title.split("\n")
    y = 137
    for line in lines:
        label(draw, (72, y), line, 54, INK)
        y += 64
    draw.rounded_rectangle((73, y + 5, 127, y + 11), radius=4, fill=GOLD)
    label(draw, (72, y + 35), note, 22, MUTED)

    rounded(draw, (575, 115, 1210, 523), (13, 21, 39), (33, 49, 76), 29, 2)
    diagram(draw, diagram_kind)

    draw.line((72, 657, 1208, 657), fill=(43, 59, 86), width=2)
    label(draw, (72, 675), "ANÁLISIS Y DISEÑO DE SISTEMAS 2", 13, MUTED)
    label(draw, (1208, 675), f"{index + 1:02d} / {len(SCENES):02d}", 14, GOLD, mono=True, anchor="ra")
    path = WORK / f"scene-{index:02d}.png"
    image.save(path)
    return path


def render_caption(scene_path: Path, text: str, index: int) -> Path:
    lines = textwrap.wrap(text, width=54, break_long_words=False, break_on_hyphens=False)
    fnt = font(24)
    background = Image.open(scene_path).convert("RGBA")
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    line_heights = [draw.textbbox((0, 0), line, font=fnt)[3] for line in lines]
    padding_x, padding_y, line_gap = 26, 18, 8
    text_height = sum(line_heights) + line_gap * max(0, len(lines) - 1)
    box_height = text_height + padding_y * 2
    box_width = min(1120, max(draw.textbbox((0, 0), line, font=fnt)[2] for line in lines) + padding_x * 2)
    x0, y0 = (WIDTH - box_width) // 2, HEIGHT - box_height - 48
    draw.rounded_rectangle((x0, y0, x0 + box_width, y0 + box_height), radius=18, fill=(5, 12, 27, 226), outline=(81, 106, 143, 230), width=1)
    y = y0 + padding_y
    for line, line_h in zip(lines, line_heights):
        bounds = draw.textbbox((0, 0), line, font=fnt)
        x = (WIDTH - bounds[2]) // 2
        draw.text((x, y), line, font=fnt, fill=(248, 251, 255, 255), stroke_width=0)
        y += line_h + line_gap
    path = WORK / f"caption-{index:02d}.png"
    Image.alpha_composite(background, overlay).convert("RGB").save(path)
    return path


def make_music(path: Path, duration: float = 16.0) -> None:
    samples = int(RATE * duration)
    t = np.arange(samples, dtype=np.float64) / RATE
    chords = [
        [261.63, 329.63, 392.00, 493.88],
        [220.00, 261.63, 329.63, 392.00],
        [174.61, 220.00, 261.63, 329.63],
        [196.00, 246.94, 293.66, 392.00],
    ]
    beat = np.floor(t / 4.0).astype(int) % len(chords)
    local = t % 4.0
    envelope = np.minimum(1.0, local / 0.7) * np.minimum(1.0, (4.0 - local) / 0.8)
    pad = np.zeros(samples, dtype=np.float64)
    for chord_index, chord in enumerate(chords):
        active = beat == chord_index
        for note_index, hz in enumerate(chord):
            phase = t[active] * hz * 2 * math.pi
            pad[active] += (np.sin(phase) + 0.18 * np.sin(2 * phase)) * (0.20 if note_index == 0 else 0.12)
    pulse = 0.84 + 0.16 * np.sin(2 * math.pi * 0.22 * t)
    signal = pad * envelope * pulse * 0.075
    stereo = np.column_stack((signal, signal * 0.96))
    pcm = np.int16(np.clip(stereo, -1, 1) * 32767)
    with wave.open(str(path), "wb") as audio:
        audio.setnchannels(2)
        audio.setsampwidth(2)
        audio.setframerate(RATE)
        audio.writeframes(pcm.tobytes())


def fmt_srt(seconds: float) -> str:
    total_ms = round(seconds * 1000)
    hours, rem = divmod(total_ms, 3_600_000)
    minutes, rem = divmod(rem, 60_000)
    secs, millis = divmod(rem, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


def make_docs(cues, scene_times, total_duration: float) -> None:
    script_lines = [
        "# Guion — Factory Method",
        "",
        f"Duración: {total_duration / 60:.2f} min · Voz: Paulina (español de México) · Formato: 16:9, 1280 × 720.",
        "",
        "## Narración",
        "",
    ]
    for idx, scene in enumerate(SCENES):
        script_lines.extend([f"### Escena {idx + 1}: {scene[0]}", ""])
        script_lines.extend(f"> {cue['text']}" for cue in cues if cue["scene"] == idx)
        script_lines.append("")
    (ROOT / "guion.md").write_text("\n".join(script_lines), encoding="utf-8")

    board = [
        "# Storyboard — Factory Method",
        "",
        "Video educativo con motion graphics vectoriales, paleta azul noche con acentos turquesa, coral y dorado. Los diagramas siguen el ejemplo `semanas/03-creacionales/codigo/factory-method.ts`.",
        "",
        "| Tiempo | Escena | Visual | Narración |",
        "|---|---|---|---|",
    ]
    for idx, scene in enumerate(SCENES):
        start, end = scene_times[idx]
        text = " ".join(cue["text"] for cue in cues if cue["scene"] == idx)
        board.append(f"| {fmt_srt(start)[3:8]}–{fmt_srt(end)[3:8]} | {scene[0]} | {scene[4]} | {text} |")
    board.extend(["", f"Duración final: {total_duration / 60:.2f} minutos. Subtítulos españoles quemados en el video y disponibles en `subtitulos.srt`.", ""])
    (ROOT / "storyboard.md").write_text("\n".join(board), encoding="utf-8")


def main() -> None:
    for executable in ("ffmpeg", "ffprobe", "say"):
        if not shutil.which(executable):
            raise SystemExit(f"Falta el comando requerido: {executable}")
    WORK.mkdir(parents=True, exist_ok=True)
    clips = []
    for index, (_, text) in enumerate(CUES):
        raw = WORK / f"voice-{index:02d}.aiff"
        clip = WORK / f"voice-{index:02d}.wav"
        run(["say", "-v", VOICE, "-o", str(raw), text])
        run([
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw),
            "-af", "atempo=1.0", "-ac", "1", "-ar", str(RATE), "-c:a", "pcm_s16le", str(clip),
        ])
        clips.append(clip)

    cue_records = []
    cursor = LEAD
    for index, ((scene_index, text), clip) in enumerate(zip(CUES, clips)):
        duration = ffprobe_duration(clip)
        cue_records.append({"scene": scene_index, "text": text, "start": cursor, "end": cursor + duration, "duration": duration, "clip": clip})
        cursor += duration + (GAP if index < len(CUES) - 1 else TAIL)
    total_duration = cursor

    silence = np.zeros(round(RATE * LEAD), dtype=np.int16).tobytes()
    tail = np.zeros(round(RATE * TAIL), dtype=np.int16).tobytes()
    voice_path = WORK / "voice.wav"
    with wave.open(str(voice_path), "wb") as output:
        output.setnchannels(1)
        output.setsampwidth(2)
        output.setframerate(RATE)
        output.writeframes(silence)
        for index, clip in enumerate(clips):
            with wave.open(str(clip), "rb") as source:
                output.writeframes(source.readframes(source.getnframes()))
            if index < len(clips) - 1:
                output.writeframes(np.zeros(round(RATE * GAP), dtype=np.int16).tobytes())
        output.writeframes(tail)

    scene_paths = [render_scene(i, scene) for i, scene in enumerate(SCENES)]
    scene_times = []
    for i in range(len(SCENES)):
        selected = [cue for cue in cue_records if cue["scene"] == i]
        start = 0.0 if i == 0 else selected[0]["start"]
        end = selected[-1]["end"] + (GAP if i < len(SCENES) - 1 else TAIL)
        scene_times.append((start, end))
    # A quiet, locally synthesized pad keeps the voice in front without a third-party music asset.
    music = WORK / "music.wav"
    make_music(music)

    captions = []
    srt = []
    for index, cue in enumerate(cue_records, 1):
        caption_path = render_caption(scene_paths[cue["scene"]], cue["text"], index)
        captions.append((caption_path, cue["start"], cue["end"]))
        body = "\n".join(textwrap.wrap(cue["text"], width=54, break_long_words=False, break_on_hyphens=False))
        srt.extend([str(index), f"{fmt_srt(cue['start'])} --> {fmt_srt(cue['end'])}", body, ""])
    (ROOT / "subtitulos.srt").write_text("\n".join(srt), encoding="utf-8")

    segments = [(scene_paths[0], LEAD)]
    segments.extend(
        (caption[0], cue["duration"] + (GAP if index < len(cue_records) - 1 else 0))
        for index, (cue, caption) in enumerate(zip(cue_records, captions))
    )
    segments.append((scene_paths[-1], TAIL))

    args = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"]
    for path, duration in segments:
        args.extend(["-loop", "1", "-framerate", str(FPS), "-t", f"{duration:.6f}", "-i", str(path)])
    music_input = len(segments)
    voice_input = music_input + 1
    args.extend(["-stream_loop", "-1", "-i", str(music), "-i", str(voice_path)])

    graph = []
    for index, (_, duration) in enumerate(segments):
        graph.append(
            f"[{index}:v]zoompan=z='min(1.02,zoom+0.000035)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={WIDTH}x{HEIGHT}:fps={FPS},"
            f"trim=duration={duration:.6f},setpts=PTS-STARTPTS,format=rgba[v{index}]"
        )
    chain = "".join(f"[v{i}]" for i in range(len(segments)))
    graph.append(f"{chain}concat=n={len(segments)}:v=1:a=0[base]")
    graph.append(
        f"[{music_input}:a]volume=0.10[bed];[{voice_input}:a]volume=1.0[voice];"
        f"[bed][voice]amix=inputs=2:duration=first:weights='1 1':normalize=0,"
        f"loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=out:st={max(0, total_duration - TAIL):.6f}:d={TAIL:.6f}[audio]"
    )
    args.extend([
        "-filter_complex", ";".join(graph), "-map", "[base]", "-map", "[audio]",
        "-t", f"{total_duration:.6f}", "-r", str(FPS), "-c:v", "libx264", "-preset", "medium",
        "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
        "-movflags", "+faststart", str(ROOT / "factory-method.mp4"),
    ])
    run(args)

    make_docs(cue_records, scene_times, total_duration)
    duration = ffprobe_duration(ROOT / "factory-method.mp4")
    if not (180 <= duration <= 300):
        raise SystemExit(f"La duración final debe quedar entre 3 y 5 minutos; se obtuvo {duration:.1f} s.")
    info = subprocess.check_output([
        "ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
        "-of", "csv=s=x:p=0", str(ROOT / "factory-method.mp4"),
    ], text=True).strip()
    if info != f"{WIDTH}x{HEIGHT}":
        raise SystemExit(f"Resolución inesperada: {info}")
    shutil.rmtree(WORK)
    print(f"Creado {ROOT / 'factory-method.mp4'} · {duration / 60:.2f} min · {info} · subtítulos: {len(cue_records)}")


if __name__ == "__main__":
    main()
