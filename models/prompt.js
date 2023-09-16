const { Schema, models, model } = require('mongoose');

const PromptSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	prompt: {
		type: String,
		require: [true, 'Prompt is required (msg from models)'],
	},
	tag: {
		type: String,
		require: [true, 'Tag is required (msg from models)'],
	},
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
