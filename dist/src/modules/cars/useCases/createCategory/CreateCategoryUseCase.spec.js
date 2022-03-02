"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriesRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCategoryUseCase_1 = require("./CreateCategoryUseCase");
describe("Create Category", () => {
    let createCategoryUseCase;
    let categoriesRepositoryInMemory;
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory_1.CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase_1.CreateCategoryUseCase(categoriesRepositoryInMemory);
    });
    it("should be able to create a new car category", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Category name test",
            description: "Category description test",
        };
        yield createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        const categoryCreated = yield categoriesRepositoryInMemory.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    }));
    it("shouldn't be able to create a new car category with same name", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Category name test",
            description: "Category description test",
        };
        yield createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        yield expect(createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        })).rejects.toEqual(new AppError_1.AppError("Category already exists!"));
    }));
});
