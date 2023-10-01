import axios from "axios"

// this is 500/month/free with latency of 1.5 seconds
export const runOnlineCodeCompiler = async (lang, code, input) => {  
    var language = {}               //FILLING IT AS PER DOCUMENTATION
    if(lang === 'c' || lang === 'c++'){
        language.id = 'cpp17'
        language.name = 'C++ 17'
    }else if(lang === 'py'){
        language.id = 'python3'
        language.name = 'Python 3'
    }else{
        return {
            success: false,
            message: "Language not supported"
        }
    }
    const options = {
        method: 'POST',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
          'X-RapidAPI-Host': process.env.X_RapidAPI_Host1
        },
        data: {
          language: language.id,
          version: 'latest',
          code: code,
          input: input
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);

        return {
            success: true,
            message: response.data.output
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error
        }
    }
}

// this is 2000/month/free with latency of 4.6 seconds
export const runCodeCompiler = async (lang, code, input) => {
    console.log('inside here')
    var language;
    if(lang === 'c' || lang === 'c++'){
        language = 'c_cpp'
    }else if(lang === 'py'){
        language = 'python'
    }else{
        return {
            success: false,
            message: "Language not supported"
        }
    }

    console.log("language is ", language)

    const options = {
        method: 'POST',
        url: 'https://code-compiler10.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'x-compile': 'rapidapi',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
          'X-RapidAPI-Host': process.env.X_RapidApi_Host2
        },
        data: {
          langEnum: [
            'php',
            'python',
            'c',
            'c_cpp',
            'csharp',
            'kotlin',
            'golang',
            'r',
            'java',
            'typescript',
            'nodejs',
            'ruby',
            'perl',
            'swift',
            'fortran',
            'bash'
          ],
          lang: language,
          code: code,
          input: input
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return {
            success: true,
            message: response.data.output
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error
        }
    }
}