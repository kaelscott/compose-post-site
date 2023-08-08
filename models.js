import mongoose from "mongoose"

const composeSchema = new mongoose.Schema ({
    title: String,
    content: String,
})

export const Compose = mongoose.model("Compose", composeSchema)