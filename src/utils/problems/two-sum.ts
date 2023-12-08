
import assert from "assert";
import { Problem } from "./GenericProblem/genericProblem";


const starterCodeTwoSum=`function TwoSum(nums,target) {
    //Scrivi qui il tuo codice
}`

const handlerTwoSum= (fn:any) => {
    // fn -> user
    try {
        const nums = [
        [2,7,11,15],
        [3,2,4],
        [3,3]];

        const targets =  [9,6,6];
        const answers = [
            [0,1],
            [1,2],
            [0,1]
        ];

    for (let i=0; i<nums.length;i++){
        // output user
        const result = fn(nums[i],targets[i]);
        assert.deepStrictEqual(result,answers[i]);
    }
    return true;
    }catch(error:any) {
        console.log("Error handling twoSum")
        throw new Error(error)
    }
    
}



 export const twoSum: Problem = {
     id: "two-sum",
     title: "1. Two Sum",
     problemStatement: `
  Dato un array di integer <code>nums</code> e un integer <code>target</code>, ritorna
  <em>gli indici di due numeri tali che la loro somma sia</em> <code>target</code>.
</p>
<p class='mt-3'>
  Puoi assumere che ogni input abbia <strong>esattamente una soluzione</strong>,e che tu non possa utilizzare lo stesso elemento più di una volta
</p>`,
     examples: [
         {
             id: 1,
             inputText: "nums = [2,7,11,15], target = 9",
             outputText: "[0,1]",
             explanation: "Siccome nums[0] + nums[1] == 9, [0, 1].",
         },
         {
             id: 2,
             inputText: "nums = [3,2,4], target = 6",
             outputText: "[1,2]",
             explanation: "Siccome nums[1] + nums[2] == 6, [1, 2].",
         },
         {
             id: 3,
             inputText: " nums = [3,3], target = 6",
             outputText: "[0,1]",
         },
     ],
     constraints: "",
     order: 0,
     starterCode: starterCodeTwoSum,
     handlerFunction: handlerTwoSum,
     starterFunctionName: ""
 }