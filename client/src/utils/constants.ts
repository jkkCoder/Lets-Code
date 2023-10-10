import { toast } from 'react-toastify';

export const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    console.log('email is ', email)
    return emailRegex.test(email);
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const difficultyOptions = ["easy","medium","hard"]
export const statusOptions = ["solved", "unsolved"]

export const defaultLanguageCode = {
    'c' : '#include<stdio.h>\n\nint main(){\n    printf("write your code here");\n    return 0;\n}',
    'c++' : '#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n    cout<<"write your code here";\n    return 0;\n}',
    'py' : "print('write your code here')"
}

export const successToastMessage = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const deleteToastMessage = (message: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}