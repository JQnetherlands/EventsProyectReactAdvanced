export const toastPresets = {
    cancel: {
        title: "Cancelled",
        description: "No changes were saved/changed",
        type: "info",
        duration: 3000,
        closable: true,
    },

    error: (err) => ({
        title: err?.title || "Error",
        description: err?.message || String(err),
        type: "error",
        closable: true,
    }),

    validation: {
        required: (field) => ({
            title: "Input missing",
            description: `${field} is required`,
            type: "error",
            closable: true,
        }),
        custom: (msg) => ({
            title: "Input error",
            description: msg,
            type: "error",
            closable: true,
        }),
    },

    success: (msg) => ({
        title: "Success",
        description: msg,
        type: "success",
        closable: true,
        duration: 3000,
    }),

    info: (msg) => ({
        title: "Info",
        description: msg,
        type: "info",
        closable: true,
        duration: 3000,
    }),
};