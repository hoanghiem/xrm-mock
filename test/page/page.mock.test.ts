import { ItemCollectionMock } from "../../src/xrm-mock/collection/itemcollection/itemcollection.mock";
import { DataMock } from "../../src/xrm-mock/data/data.mock";
import { AttributeMock } from "../../src/xrm-mock/page/attribute/attribute.mock";
import { AutoLookupControlMock } from "../../src/xrm-mock/page/autolookupcontrol/autolookupcontrol.mock";
import { ControlMock } from "../../src/xrm-mock/page/control/control.mock";
import { EntityMock } from "../../src/xrm-mock/page/entity/entity.mock";
import { PageMock } from "../../src/xrm-mock/page/page.mock";
import { StandardControlMock } from "../../src/xrm-mock/page/standardcontrol/standardcontrol.mock";
import { StringAttributeMock } from "../../src/xrm-mock/page/stringattribute/stringattribute.mock";
import { StringControlMock } from "../../src/xrm-mock/page/stringcontrol/stringcontrol.mock";
import { UiKeyPressableMock } from "../../src/xrm-mock/page/uikeypressable/uikeypressable.mock";
import { UiMock } from "../../src/xrm-mock/ui/ui.mock";
import { XrmStaticMock } from "../../src/xrm-mock/xrmstatic.mock";

describe("Xrm.Page Mock", () => {
    let lastName: StringAttributeMock;
    let xrmPageMock: PageMock;

    beforeEach(() => {
        const attributes: Array<AttributeMock<StringControlMock, string>> = [];
        attributes.push(new AttributeMock<StringControlMock, string>({ name: "firstname", value: "Joe" }));
        attributes.push(new AttributeMock<StringControlMock, string>({ name: "description" }));
        lastName = new StringAttributeMock({
            isDirty: true,
            name: "lastname",
            requiredLevel: "recommended",
            submitMode: "always",
            value: "Bloggs",
        });
        attributes.push(lastName);
        const control = new StringControlMock({
            attribute: lastName,
            controlType: "standard",
            name: "lastname",
            uncommittedText: "Bloggs",
        });

        xrmPageMock = new PageMock({
            data: new DataMock(
                new EntityMock("{0}", new ItemCollectionMock<AttributeMock<StringControlMock, string>>(attributes))),
            ui: new UiMock({
                controls: new ItemCollectionMock<StringControlMock>([control]),
            }),
        });
    });

    it("should exist", () => {
        expect(xrmPageMock).toBeDefined();
    });

    describe("getAttribute", () => {
        it("should exist", () => {
            expect(xrmPageMock.getAttribute).toBeDefined();
        });

        it("by string should return Bloggs for lastname", () => {
            expect(xrmPageMock.getAttribute("lastname")).toBe(lastName);
        });

        it("by index should return Bloggs for 2", () => {
            expect(xrmPageMock.getAttribute(2)).toBe(lastName);
        });

        it("should get attribute and value in one line", () => {
            expect(xrmPageMock.getAttribute("firstname").getValue()).toBe("Joe");
        });

        it("should return null if the attribute doesn't exist", () => {
            expect(xrmPageMock.getAttribute("doesntexist")).toBeNull();
        });
    });

    describe("getControl", () => {
        it("should exist", () => {
            expect(xrmPageMock.getControl).toBeDefined();
        });

        it("should get by index", () => {
            expect(xrmPageMock.getControl(0)).toBeDefined();
        });

        it("should return Bloggs for the control's bound attribute value", () => {
            expect(xrmPageMock.getControl<StringControlMock>("lastname").getAttribute().getValue()).toBe("Bloggs");
        });
    });
});
