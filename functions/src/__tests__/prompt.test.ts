import { buildPrompt, Step } from '../index';
import template from '../templates/airbnb_instruction.json';

describe('buildPrompt()', () => {
    it('should include basePrompt, each instruction, the listing and JSON-fields clause', () => {
        const listing = 'Cozy studio near the metro station';
        const prompt = buildPrompt(listing);

        expect(prompt).toContain(template.basePrompt);

        template.steps.forEach((step: Step) => {
            expect(prompt).toContain(step.instruction);
        });

        expect(prompt).toContain(listing);

        const quotedFields = (template.steps as Step[])
            .map(s => `"${s.field}"`)
            .join(', ');
        expect(prompt).toContain(
            `Respond only in JSON with fields ${quotedFields}.`
        );
    });
});