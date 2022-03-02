"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const DayjsDateProvider_1 = require("./DateProvider/implementations/DayjsDateProvider");
tsyringe_1.container.registerSingleton("DayjsDateProvider", DayjsDateProvider_1.DayjsDateProvider);
