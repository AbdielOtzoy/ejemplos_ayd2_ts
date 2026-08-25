const patternContent = {
  observer: {
    name: "Observer",
    title: "Suscribir componentes a un flujo de eventos.",
    body: "Úsalo cuando un cambio, como activar un aviso o cambiar el tema, debe notificar a varios elementos sin que el emisor conozca cada receptor.",
    flow: ["Evento", "Suscriptores", "Respuesta"],
  },
  command: {
    name: "Command",
    title: "Convertir una acción en una solicitud intercambiable.",
    body: "Úsalo cuando varios controles pueden disparar acciones y quieres conservar una operación que se pueda registrar, repetir o deshacer.",
    flow: ["Botón", "Solicitud", "Ejecutor"],
  },
  mediator: {
    name: "Mediator",
    title: "Coordinar controles sin conectarlos entre sí.",
    body: "Úsalo cuando un formulario tiene demasiadas relaciones directas y un coordinador puede centralizar las reglas de interacción.",
    flow: ["Control", "Mediador", "Estado"],
  },
  "abstract-factory": {
    name: "Abstract Factory",
    title: "Crear familias completas de componentes coherentes.",
    body: "Úsalo cuando el sistema debe cambiar de tema o identidad sin mezclar botones, tipografías y superficies de familias distintas.",
    flow: ["Familia", "Componentes", "Interfaz"],
  },
};

const lensContent = {
  ux: {
    title: "¿Qué necesita lograr la persona y qué evidencia nos demuestra que lo logró?",
    items: [
      ["Investigación", "Comprender el contexto antes de diseñar."],
      ["Prototipo", "Probar una idea antes de construirla."],
      ["Validación", "Detectar fricciones y corregirlas."],
    ],
  },
  ui: {
    title: "¿Qué debe ver y cómo debe responder la interfaz después de cada acción?",
    items: [
      ["Jerarquía", "Guiar la atención con composición y contraste."],
      ["Estados", "Hacer visible reposo, foco, carga, error y éxito."],
      ["Consistencia", "Repetir reglas para que el sistema sea predecible."],
    ],
  },
  ia: {
    title: "¿Cómo se organiza el contenido para que el usuario pueda encontrarlo?",
    items: [
      ["Agrupación", "Poner cerca lo que pertenece a la misma tarea."],
      ["Etiquetas", "Usar palabras que las personas reconocen."],
      ["Navegación", "Mostrar dónde está y qué puede hacer después."],
    ],
  },
  catalog: {
    title: "¿Qué reglas compartidas mantienen reconocible la identidad?",
    items: [
      ["Tokens", "Nombrar colores, tamaños y espaciados reutilizables."],
      ["Componentes", "Documentar piezas y comportamientos repetibles."],
      ["Voz", "Alinear el tono de los mensajes con la marca."],
    ],
  },
};

const state = {
  catalogView: "counterexample",
  iaView: "counterexample",
  formMode: "counterexample",
  lens: "ux",
  pattern: "observer",
  checks: new Set(),
};

const catalogViews = {
  counterexample: {
    preview: `
      <div class="preview-topbar bad-topbar">
        <span class="preview-logo">aAULa???</span>
        <span class="preview-status">¡¡¡PORTAL 2.0!!!</span>
      </div>
      <div class="preview-content">
        <div class="preview-copy">
          <span class="preview-kicker">¿QUÉ ES ESTO?</span>
          <h4>¡¡¡Continúa tu aprendizaje!!!</h4>
          <p>Encuentra tus cursos, recursos y otras cosas importantes. O no.</p>
          <div class="preview-actions">
            <button class="preview-button primary" type="button">CLIC AQUÍ!!!</button>
            <button class="preview-button secondary" type="button">Tal vez</button>
          </div>
        </div>
        <div class="preview-stat" aria-label="Cursos activos">
          <strong>04?</strong>
          <span>cosas activas</span>
        </div>
      </div>
      <div class="preview-message" role="status"><strong>FALLA:</strong> cada componente parece venir de una aplicación distinta.</div>`,
    tokens: `
      <div class="token-row"><span>Color principal</span><span class="swatches"><i class="swatch swatch-navy"></i><i class="swatch swatch-gold"></i><i class="swatch swatch-red"></i><i class="swatch swatch-lime"></i></span></div>
      <div class="token-row"><span>Tipografía</span><strong class="token-type bad-type">Arial + Comic Sans + Impact</strong></div>
      <div class="token-row"><span>Espaciado base</span><strong>“A ojo”</strong></div>
      <div class="token-row"><span>Estado</span><span class="token-chip bad-chip">¿hover? ¿error?</span></div>
      <p class="token-note"><strong>Falla:</strong> adivinar no es un sistema de diseño.</p>`,
  },
  proposal: {
    preview: `
      <div class="preview-topbar">
        <span class="preview-logo">AULA</span>
        <span class="preview-status">Portal universitario</span>
      </div>
      <div class="preview-content">
        <div class="preview-copy">
          <span class="preview-kicker">MI ESPACIO</span>
          <h4>Continúa tu aprendizaje</h4>
          <p>Encuentra tus cursos y recursos en un solo lugar.</p>
          <div class="preview-actions">
            <button class="preview-button primary" type="button">Ver cursos</button>
            <button class="preview-button secondary" type="button">Explorar</button>
          </div>
        </div>
        <div class="preview-stat" aria-label="Cursos activos">
          <strong>04</strong>
          <span>cursos activos</span>
        </div>
      </div>
      <div class="preview-message" role="status"><strong>CORRECCIÓN:</strong> los tokens mantienen una misma identidad.</div>`,
    tokens: `
      <div class="token-row"><span>Color principal</span><span class="swatches"><i class="swatch swatch-navy"></i><i class="swatch swatch-gold"></i><i class="swatch swatch-red"></i></span></div>
      <div class="token-row"><span>Tipografía</span><strong class="token-type">Inter / 700</strong></div>
      <div class="token-row"><span>Espaciado base</span><strong>8 px</strong></div>
      <div class="token-row"><span>Estado</span><span class="token-chip">hover / focus / error</span></div>
      <p class="token-note"><strong>Corrección:</strong> una regla compartida reduce decisiones repetidas.</p>`,
  },
};

const labViews = {
  accessibility: {
    counterexample: {
      preview: `<div class="contrast-sample">Texto gris clarito que casi no se ve</div><div class="icon-actions"><button type="button" aria-label="Acción sin texto">...</button><button type="button" aria-label="Otra acción sin texto">?</button></div><p class="lab-status">Foco invisible. Si usas teclado, buena suerte.</p>`,
      answer: `<p><strong>Falla:</strong> contraste bajo, controles sin significado visible y foco imperceptible.</p><p><strong>Corrección:</strong> contraste suficiente, etiquetas claras, foco visible y acciones que no dependan solo de un icono.</p>`,
    },
    proposal: {
      preview: `<div class="contrast-sample">Texto legible con contraste suficiente</div><div class="icon-actions"><button type="button">Editar perfil</button><button type="button">Ver ayuda</button></div><p class="lab-status">Foco visible. Cada acción explica qué hará.</p>`,
      answer: `<p><strong>Bien:</strong> el contraste permite leer y los botones expresan su acción.</p><p><strong>Idea clave:</strong> accesibilidad no es quitar diseño; es quitar barreras.</p>`,
    },
  },
  states: {
    counterexample: {
      preview: `<button class="state-button" type="button">Guardar</button><span class="state-indicator">...</span><p class="lab-status">La pantalla no cambia. El usuario vuelve a hacer clic 17 veces.</p>`,
      answer: `<p><strong>Falla:</strong> no hay estado de carga, confirmación ni error. La persona no sabe si debe esperar o repetir.</p><p><strong>Corrección:</strong> mostrar reposo, foco, carga, éxito y error con mensajes específicos.</p>`,
    },
    proposal: {
      preview: `<button class="state-button is-proposal" type="button" data-state-demo>Guardar</button><span class="state-indicator is-success">Listo</span><p class="lab-status">Haz clic en “Guardar” para simular una respuesta clara.</p>`,
      answer: `<p><strong>Bien:</strong> el estado visible confirma que la acción terminó.</p><p><strong>Prueba:</strong> pulsa el botón y observa cómo cambia el texto a “Inscripción guardada”.</p>`,
    },
  },
  hierarchy: {
    counterexample: {
      preview: `<span class="hierarchy-kicker">TODO ES IMPORTANTE</span><h4>Panel de estudiante</h4><p>Texto principal, texto secundario, texto terciario, aviso, promoción y otra cosa más.</p><div class="hierarchy-actions"><button type="button">Acción A</button><button type="button">Acción B</button><button type="button">Acción C</button></div>`,
      answer: `<p><strong>Falla:</strong> todos los elementos compiten por atención y ninguna acción parece prioritaria.</p><p><strong>Corrección:</strong> usar tamaño, posición, contraste y espacio para construir una lectura clara.</p>`,
    },
    proposal: {
      preview: `<span class="hierarchy-kicker">TAREA DE HOY</span><h4>Completa tu inscripción</h4><p>Revisa tus datos y confirma el curso antes de guardar.</p><div class="hierarchy-actions"><button class="is-primary" type="button">Confirmar inscripción</button><button type="button">Guardar para después</button></div>`,
      answer: `<p><strong>Bien:</strong> una tarea principal, una explicación breve y una acción prioritaria.</p><p><strong>Idea clave:</strong> la jerarquía visual reduce la cantidad de decisiones que el usuario debe tomar.</p>`,
    },
  },
};

function setPressed(buttons, activeButton) {
  buttons.forEach((button) => {
    const active = button === activeButton;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateCatalog(button) {
  const buttons = [...document.querySelectorAll("[data-catalog-view]")];
  state.catalogView = button.dataset.catalogView;
  setPressed(buttons, button);
  const preview = document.querySelector(".catalog-preview");
  const tokenPanel = document.querySelector(".token-panel");
  const view = catalogViews[state.catalogView];
  if (preview && view) {
    preview.dataset.mode = state.catalogView;
    preview.innerHTML = view.preview;
  }
  if (tokenPanel && view) tokenPanel.innerHTML = view.tokens;
}

function updateArchitecture(button) {
  const buttons = [...document.querySelectorAll("[data-ia-view]")];
  state.iaView = button.dataset.iaView;
  setPressed(buttons, button);
  const stage = document.querySelector(".ia-stage");
  if (!stage) return;
  stage.dataset.mode = state.iaView;
  const sidebar = stage.querySelector(".ia-sidebar");
  sidebar.innerHTML = state.iaView === "proposal"
    ? `<span class="preview-logo">AULA</span><p class="nav-caption">MI ESPACIO</p><ul class="good-nav"><li><button type="button">Mis cursos</button></li><li><button type="button">Recursos</button></li><li><button type="button">Calendario</button></li><li><button type="button">Cuenta</button></li></ul>`
    : `<span class="preview-logo">AULA</span><p class="nav-caption">MENÚ PRINCIPAL</p><ul class="bad-nav"><li><button type="button">Cosas</button></li><li><button type="button">Más</button></li><li><button type="button">Lo de hoy</button></li><li><button type="button">Varias</button></li></ul>`;
  const explanation = stage.querySelector(".ia-explanation");
  if (explanation) explanation.innerHTML = state.iaView === "proposal"
    ? "<strong>CORRECCIÓN</strong> Las etiquetas siguen las tareas que la persona reconoce."
    : "<strong>FALLA 01</strong> Etiquetas ambiguas obligan al usuario a jugar “¿dónde estará?”.<br><strong>FALLA 02</strong> El menú agrupa por ocurrencia, no por tarea.";
}

function updateLens(button) {
  const buttons = [...document.querySelectorAll("[data-lens]")];
  state.lens = button.dataset.lens;
  setPressed(buttons, button);
  const content = lensContent[state.lens];
  const detail = document.querySelector(".lens-detail");
  if (!detail || !content) return;
  detail.innerHTML = `<p class="micro-label">PREGUNTA GUÍA</p><h3>${content.title}</h3><div class="lens-detail-grid">${content.items.map(([label, text]) => `<div><strong>${label}</strong><span>${text}</span></div>`).join("")}</div>`;
}

function updateFormMode(button) {
  const buttons = [...document.querySelectorAll("[data-form-mode]")];
  state.formMode = button.dataset.formMode;
  setPressed(buttons, button);
  const formDemo = document.querySelector(".form-demo");
  if (formDemo) formDemo.dataset.mode = state.formMode;
  const feedback = document.querySelector("#form-feedback");
  const warning = document.querySelector("[data-form-warning]");
  const diagnosis = document.querySelector(".form-diagnosis");
  if (!feedback) return;
  feedback.className = state.formMode === "proposal" ? "form-feedback" : "form-feedback is-error";
  feedback.textContent = state.formMode === "proposal"
    ? "El sistema te dirá qué falta y cómo continuar."
    : "No se pudo guardar. Revisa los datos. ¿Cuáles? Sorpresa.";
  if (warning) warning.textContent = state.formMode === "proposal"
    ? "CORRECCIÓN: etiqueta clara + mensaje específico + estado anunciado."
    : "FALLA: mensaje genérico + campos que parecen una auditoría fiscal.";
  if (diagnosis) diagnosis.innerHTML = state.formMode === "proposal"
    ? `<p class="micro-label">DIAGNÓSTICO</p><div class="diagnosis-item is-good"><strong>SOLUCIÓN 01</strong><span>El mensaje indica exactamente qué falta y cómo continuar.</span></div><div class="diagnosis-item is-good"><strong>SOLUCIÓN 02</strong><span>El estado confirma la acción y evita clics repetidos.</span></div>`
    : `<p class="micro-label">DIAGNÓSTICO</p><div class="diagnosis-item is-bad"><strong>FALLA 01</strong><span>El mensaje dice que falló, pero no qué campo corregir.</span></div><div class="diagnosis-item is-bad"><strong>FALLA 02</strong><span>El botón no muestra si está guardando, bloqueado o terminado.</span></div>`;
}

function updateLabExplanation(card, mode, content) {
  const details = card.querySelector(".lab-explanation");
  if (!details) return;
  details.querySelector("summary").textContent = mode === "proposal" ? "Ver por qué funciona" : "Ver qué falla y cómo corregirlo";
  details.querySelector(".lab-answer").innerHTML = content.answer;
}

function bindStateDemo(card) {
  const button = card.querySelector("[data-state-demo]");
  if (!button) return;
  button.addEventListener("click", () => {
    const indicator = card.querySelector(".state-indicator");
    const message = card.querySelector(".lab-status");
    button.textContent = "Guardado";
    button.disabled = true;
    if (indicator) {
      indicator.textContent = "ÉXITO";
      indicator.classList.add("is-success");
    }
    if (message) message.textContent = "Inscripción guardada. El sistema confirmó la acción.";
  });
}

function updateLabView(button) {
  const [labName, viewName] = button.dataset.labView.split("-");
  const view = viewName === "proposal" ? "proposal" : "counterexample";
  const buttons = [...document.querySelectorAll(`[data-lab-view^="${labName}-"]`)];
  setPressed(buttons, button);
  const card = document.querySelector(`[data-lab="${labName}"]`);
  const content = labViews[labName]?.[view];
  if (!card || !content) return;
  card.dataset.mode = view;
  card.querySelector(".lab-preview").innerHTML = content.preview;
  updateLabExplanation(card, view, content);
  bindStateDemo(card);
}

function updatePattern(button) {
  const buttons = [...document.querySelectorAll("[data-pattern]")];
  state.pattern = button.dataset.pattern;
  setPressed(buttons, button);
  const content = patternContent[state.pattern];
  const detail = document.querySelector(".pattern-detail");
  if (!detail || !content) return;
  detail.innerHTML = `<p class="micro-label">DECISIÓN SUGERIDA</p><span class="pattern-badge">${content.name}</span><h3>${content.title}</h3><p>${content.body}</p><div class="pattern-flow">${content.flow.map((item, index) => `${index ? '<i aria-hidden="true">&#8594;</i>' : ""}<span>${item}</span>`).join("")}</div>`;
}

function updateActivity(button) {
  const key = button.dataset.check;
  if (state.checks.has(key)) state.checks.delete(key);
  else state.checks.add(key);
  button.classList.toggle("is-complete", state.checks.has(key));
  const progress = document.querySelector(".activity-progress");
  if (progress) progress.textContent = `${state.checks.size} de 3 decisiones registradas.`;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = document.querySelector("#form-feedback");
  if (!feedback) return;
  feedback.className = "form-feedback";
  if (state.formMode === "counterexample") {
    feedback.classList.add("is-error");
    feedback.textContent = "No se pudo guardar. Revisa los datos.";
    return;
  }
  const name = form.elements["student-name"].value.trim();
  const course = form.elements["student-course"].value;
  if (!name || !course) {
    feedback.classList.add("is-error");
    feedback.textContent = !name ? "Escribe tu nombre para continuar." : "Selecciona un curso para continuar.";
    return;
  }
  feedback.classList.add("is-success");
  feedback.textContent = "Inscripción guardada. El sistema confirmó la acción.";
}

function toggleJoke(button) {
  const open = button.classList.toggle("is-open");
  button.setAttribute("aria-expanded", String(open));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-catalog-view]").forEach((button) => button.addEventListener("click", () => updateCatalog(button)));
  document.querySelectorAll("[data-ia-view]").forEach((button) => button.addEventListener("click", () => updateArchitecture(button)));
  document.querySelectorAll("[data-lens]").forEach((button) => button.addEventListener("click", () => updateLens(button)));
  document.querySelectorAll("[data-form-mode]").forEach((button) => button.addEventListener("click", () => updateFormMode(button)));
  document.querySelectorAll("[data-lab-view]").forEach((button) => button.addEventListener("click", () => updateLabView(button)));
  document.querySelectorAll("[data-pattern]").forEach((button) => button.addEventListener("click", () => updatePattern(button)));
  document.querySelectorAll("[data-check]").forEach((button) => button.addEventListener("click", () => updateActivity(button)));
  document.querySelectorAll("[data-joke]").forEach((button) => button.addEventListener("click", () => toggleJoke(button)));
  document.querySelector("#demo-form")?.addEventListener("submit", handleFormSubmit);
  const initialCatalog = document.querySelector("[data-catalog-view='counterexample']");
  const initialForm = document.querySelector("[data-form-mode='counterexample']");
  if (initialCatalog) updateCatalog(initialCatalog);
  if (initialForm) updateFormMode(initialForm);
  document.querySelectorAll("[data-lab-view$='-counterexample']").forEach((button) => updateLabView(button));
});
