export const commonProductAttributes = [
    {
        label: "Name",
        formName: "p_name",
        attributeType: "input_text",
        type: "p",
        isRequired: 1,
        isCommon: 1,
        options: []
    },
    {
        label: "Brand",
        formName: "brandId",
        attributeType: "dropdown",
        type: "p",
        isRequired: 1,
        isCommon: 1,
        options: []
    },
    {
        label: "Price",
        formName: "price",
        attributeType: "input_decimal",
        type: "v",
        isRequired: 1,
        isCommon: 1,
        options: []
    },
    {
        label: "Sku",
        formName: "sku",
        attributeType: "input_text",
        type: "v",
        isRequired: 1,
        isCommon: 1,
        options: []
    },
    {
        label: "Quantity",
        formName: "quantity",
        attributeType: "input_number",
        type: "v",
        isRequired: 1,
        isCommon: 1,
        options: []
    },
    {
        label: "Sale Price",
        formName: "sale_price",
        attributeType: "input_decimal",
        type: "v",
        isRequired: 0,
        isCommon: 1,
        options: []
    },
    {
        label: "Sale Start Date",
        formName: "start_sale_date",
        attributeType: "calendar",
        type: "v",
        isRequired: 0,
        isCommon: 1,
        options: []
    },
    {
        label: "Sale End Date",
        formName: "end_sale_date",
        attributeType: "calendar",
        type: "v",
        isRequired: 0,
        isCommon: 1,
        options: []
    },
    {
        label: "Name",
        formName: "shortDesc",
        attributeType: "short_desc",
        type: "p",
        isRequired: 1,
        isCommon: 1,
        options: []
    },
    {
        label: "Name",
        formName: "longDesc",
        attributeType: "long_desc",
        type: "p",
        isRequired: 1,
        isCommon: 1,
        options: []
    }
];