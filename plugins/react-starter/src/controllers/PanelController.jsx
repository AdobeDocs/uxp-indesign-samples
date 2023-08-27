import ReactDOM from "react-dom";

export class PanelController {
    #_id = null
    #_root = null
    #_attachment = null
    #_Component = null
    #_menuItems = []

    constructor(Component, { id, menuItems } = {}) {
        this.#_Component = Component;
        this.#_id = id;
        this.#_menuItems = menuItems || [];
        this.menuItems = this.#_menuItems.map(menuItem => ({
            id: menuItem.id,
            label: menuItem.label,
            enabled: menuItem.enabled || true,
            checked: menuItem.checked || false
        }));

        ["create", "show", "hide", "destroy", "invokeMenu"].forEach(fn => this[fn] = this[fn].bind(this));
    }

    create() {
        this.#_root = document.createElement("div");
        this.#_root.style.height = "100vh";
        this.#_root.style.overflow = "auto";
        this.#_root.style.padding = "8px";

        ReactDOM.render(this.#_Component({ panel: this }), this.#_root);

        return this.#_root;
    }

    show(event) {
        if (!this.#_root) this.create();
        this.#_attachment = event;
        this.#_attachment.appendChild(this.#_root);
    }

    hide() {
        if (this.#_attachment && this.#_root) {
            this.#_attachment.removeChild(this.#_root);
            this.#_attachment = null;
        }
    }

    destroy() { }

    invokeMenu(id) {
        const menuItem = this.#_menuItems.find(c => c.id === id);
        if (menuItem) {
            const handler = menuItem.oninvoke;
            if (handler) {
                handler();
            }
        }
    }
}
