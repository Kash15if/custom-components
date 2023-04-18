const navs = [
    {
        link: { url: "#", label: "Tables" },
        dropdown: [
            {
                link: { url: "sortable", label: "Sortable" },
                dropdown: [{
                    link: { url: "", label: "" }
                }]
            },
            {
                link: { url: "Filterable", label: "Filterable" },
            },
            {
                link: { url: "Editable", label: "Editable" },
            },
            {
                link: { url: "SortFilterEdit", label: "SortFilterEdit" },
            },
            {
                link: { url: "CRUDIE", label: "CRUDIE" },
            },
            {
                link: { url: "Expandable", label: "Expandable with Component" },
            },
            {
                link: { url: "Recursive Expandable", label: "Recursive Expandable" },
            },
        ]
    },
    {
        link: { url: "#", label: "Carousels" },
        dropdown: [
            {
                link: { url: "Horizontal", label: "Horizontal" },
            },
            {
                link: { url: "Vertical", label: "Vertical" },
            },
            {
                link: { url: "Convex", label: "Convex Carousel" },
            },
            {
                link: { url: "Concave", label: "Concave Carousel" },
            },
        ]
    },
    {
        link: { url: "#", label: "Popups" },
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