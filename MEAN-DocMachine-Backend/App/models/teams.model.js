const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const TeamSchema = new Schema(
    {
        userId: {
            type: String,
        },
        teamName: {
            type: String,
        },
        iec: {
            type: String,
        },
        adress: {
            type: String,
        },
        phone: {
            type: String,
        },
        caEmail: {
            type: String,
        },
        chaEmail: {
            type: String,
        },
        gst: {
            type: String,
        },

        location: {
            type: Schema.Types.Mixed,
        },

        commodity: {
            type: Schema.Types.Mixed,
        },
        bankDetails: {
            type: Schema.Types.Mixed,
        },
        letterHead: {
            type: String,
        },
        roundSeal: {
            type: String,
        },
        forSeal: {
            type: String,
        },
        member: {
            type: Array
        },
        file: {
            type: Array
        },



    },
    { timestamps: true }
);
const Team = mongoose.model("teams", TeamSchema);

module.exports = {
    TeamModel: Team,
    TeamSchema: TeamSchema
};