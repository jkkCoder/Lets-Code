import { runCodeCompiler, runOnlineCodeCompiler } from "../utils/compile.js"
import Question from '../models/QuestionModel.js'

// POST         /solution/compile       PROTECTED
export const compileCode = async(req,res) => {
    const {lang, code, questionId} = req.body
    try{
        const question = await Question.findById(questionId).select('testCases')

        for (const testCase of question.testCases) {
            //running compiler for each testcase and comparing the actual and expected ouput
            const result = await runCodeCompiler(lang, code, testCase.input.split(' ').join(' \n '))
            if(!result.success){
                return res.status(400).json({
                    success: false,
                    message: result.message
                })
            }
            if(result.message.trimEnd() !== testCase.expectedOutput){
                return res.status(200).json({
                    success: true,
                    compileStatus: 'ERROR',
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: result.message.trimEnd()
                })
            }
        };

        return res.status(200).json({
            success: true,
            compileStatus: 'SUCCESS',
        })
        
    }catch(err){
        console.log('err is ', err)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}