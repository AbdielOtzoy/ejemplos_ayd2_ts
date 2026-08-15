import { demoLibreriaVsFramework } from "./fundamentos/libreria-vs-framework";
import { demoSrp } from "./solid/srp";
import { demoOcp } from "./solid/ocp";
import { demoLsp } from "./solid/lsp";
import { demoIsp } from "./solid/isp";
import { demoDip } from "./solid/dip";
import { demoFactoryMethod } from "./creacionales/factory-method";
import { demoAbstractFactory } from "./creacionales/abstract-factory";
import { demoSingleton } from "./creacionales/singleton";
import { demoBuilder } from "./creacionales/builder";
import { demoPrototype } from "./creacionales/prototype";
import { demoAdapter } from "./estructurales/adapter";
import { demoProxy } from "./estructurales/proxy";
import { demoFacade } from "./estructurales/facade";
import { demoDecorator } from "./estructurales/decorator";
import { demoBridge } from "./estructurales/bridge";
import { demoFlyweight } from "./estructurales/flyweight";
import { demoObserver } from "./comportamiento/observer";
import { demoCommand } from "./comportamiento/command";
import { demoChainOfResponsibility } from "./comportamiento/chain-of-responsibility";
import { demoVisitor } from "./comportamiento/visitor";
import { demoMediator } from "./comportamiento/mediator";

console.log("ADS2 · demostraciones de patrones de diseño y SOLID");

// El orden va de los fundamentos a SOLID y luego recorre las familias de
// patrones en el mismo sentido que las presentaciones del curso.
demoLibreriaVsFramework();

demoSrp();
demoOcp();
demoLsp();
demoIsp();
demoDip();

demoFactoryMethod();
demoAbstractFactory();
demoSingleton();
demoBuilder();
demoPrototype();

demoAdapter();
demoProxy();
demoFacade();
demoDecorator();
demoBridge();
demoFlyweight();

demoObserver();
demoCommand();
demoChainOfResponsibility();
demoVisitor();
demoMediator();
