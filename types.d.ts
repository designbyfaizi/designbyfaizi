type NotionPage = {
    object: "page";
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: NotionUser;
    last_edited_by: NotionUser;
    cover?: NotionCover;
    icon?: NotionIcon;
    parent: NotionParent;
    archived: boolean;
    properties: NotionProperties;
    url: string;
};

type NotionUser = {
    object: "user";
    id: string;
    name?: string;
    avatar_url?: string;
    type?: "person";
    person?: {
        email: string;
    };
};

type NotionCover = {
    type: "external";
    external: {
        url: string;
    };
};

type NotionIcon = {
    type: "emoji";
    emoji: string;
};

type NotionParent = {
    type: "database_id";
    database_id: string;
};

type NotionProperties = {
    [key: string]: NotionProperty;
};

type NotionProperty =
    | NotionMultiSelect
    | NotionSelect
    | NotionNumber
    | NotionPeople
    | NotionDate
    | NotionFormula
    | NotionRelation
    | NotionRichText
    | NotionCheckbox
    | NotionRollup
    | NotionUrl
    | NotionTitle;

type NotionMultiSelect = {
    id: string;
    type: "multi_select";
    multi_select: {
        id: string;
        name: string;
        color: string;
    }[];
};

type NotionSelect = {
    id: string;
    type: "select";
    select: {
        id: string;
        name: string;
        color: string;
    } | null;
};

type NotionNumber = {
    id: string;
    type: "number";
    number: number;
};

type NotionPeople = {
    id: string;
    type: "people";
    people: NotionUser[];
};

type NotionDate = {
    id: string;
    type: "date";
    date: {
        start: string;
        end?: string | null;
        time_zone?: string | null;
    } | null;
};

type NotionFormula = {
    id: string;
    type: "formula";
    formula: {
        type: "number";
        number?: number;
    };
};

type NotionRelation = {
    id: string;
    type: "relation";
    relation: {
        id: string;
    }[];
    has_more: boolean;
};

type NotionRichText = {
    id: string;
    type: "rich_text";
    rich_text: {
        type: "text";
        text: {
            content: string;
            link?: string | null;
        };
        annotations: {
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
            code: boolean;
            color: string;
        };
        plain_text: string;
        href?: string | null;
    }[];
};

type NotionCheckbox = {
    id: string;
    type: "checkbox";
    checkbox: boolean;
};

type NotionRollup = {
    id: string;
    type: "rollup";
    rollup: {
        type: "number";
        number?: number;
        function: string;
    };
};

type NotionUrl = {
    id: string;
    type: "url";
    url?: string;
};

type NotionTitle = {
    id: string;
    type: "title";
    title: {
        type: "text";
        text: {
            content: string;
            link?: string | null;
        };
        annotations: {
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
            code: boolean;
            color: string;
        };
        plain_text: string;
        href?: string | null;
    }[];
};

type NotionResponse = NotionPage;
