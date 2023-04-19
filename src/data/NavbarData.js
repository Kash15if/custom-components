const navs = [
    {
        link: { url: "/", label: "Custom Components" },
    },
    {
        link: { url: "/tables", label: "Tables" },
        dropdown: [
            {
                link: { url: "/tables#sortable", label: "Sortable" },
                // dropdown: [{
                //     link: { url: "", label: "" }
                // }]
            },
            {
                link: { url: "/tables#filterable", label: "Filterable" },
            },
            {
                link: { url: "/tables#editable", label: "Editable" },
            },
            {
                link: { url: "/tables#sortFilterEdit", label: "SortFilterEdit" },
            },
            {
                link: { url: "/tables#CRUDIE", label: "CRUDIE" },
            },
            {
                link: { url: "/tables#expandable", label: "Expandable with Component" },
            },
            {
                link: { url: "/tables#recursiveExpandable", label: "Recursive Expandable" },
            },
        ]
    },
    {
        link: { url: "/sliders", label: "Carousels" },
        dropdown: [
            {
                link: { url: "/sliders#horizontal", label: "Horizontal" },
            },
            {
                link: { url: "/sliders#vertical", label: "Vertical" },
            },
            {
                link: { url: "/sliders#convex", label: "Convex Carousel" },
            },
            {
                link: { url: "/sliders#concave", label: "Concave Carousel" },
            },
        ]
    },
    {
        link: { url: "popups", label: "Popups" },
        dropdown: [
            {
                link: { url: "Confirmation", label: "Confirmation Popup" },
            },
            {
                link: { url: "Popup", label: "Popup" },
            },
        ]
    },

]


export default navs;