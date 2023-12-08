import assert from "assert";
import { Problem } from "./GenericProblem/genericProblem";

export const jumpGameHandler = (fn: any) => {
	try {
		const tests = [
			[2, 3, 1, 1, 4],
			[3, 2, 1, 0, 4],
			[2, 0, 0],
			[2, 5, 0, 0],
		];
		const answers = [true, false, true, true];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Errore da jumpgameHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeJumpGameJS = `function canJump(nums) {
  // Scrivi qui il tuo codice
};`;

export const jumpGame: Problem = {
	id: "jump-game",
	title: "3. Jump Game",
	problemStatement: `<p class='mt-3'>
    Viene fornito un array di integer <code>nums</code>. Si è inizialmente posizionati al <strong>primo indice</strong>
    e ogni elemento dell'array rappresenta la lunghezza massima che si può "saltare" a quella poszione
  </p>
    <p class='mt-3'>
    Ritorna <code>true</code> se è possibile raggiungere l'ultime index, oppure <code>false</code> in caso contrario.
    </p>
  `,

	examples: [
		{
			id: 0,
			inputText: `nums = [2,3,1,1,4]`,
			outputText: `true`,
			explanation: "Saltiamo 1 volta dall'indice 0 all'indice 1, poi saltiamo di 3 posizioni e arriviamo all'ultimo indice.",
		},
		{
			id: 1,
			inputText: `nums = [3,2,1,0,4]`,
			outputText: `false`,
			explanation:
				"Arriveremo sempre al 3 indice qualsiasi scelta prendiamo. Il salto massimo che possiamo fare è 0, quindi è impossibile raggiungere l'ultimo indice.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
	starterCode: starterCodeJumpGameJS,
	handlerFunction: jumpGameHandler,
	starterFunctionName: "function canJump(",
	order: 3,
};