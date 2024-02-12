import inquirer from "inquirer";

interface AnswerType {
    userID: string;
    userPIN: number;
    accountType: string;
    transectionType: string;
    amount: number;
}

const answer: AnswerType = await inquirer.prompt([
    {
        type: "number",
        name: "userID",
        message: "Enter your UserID:"
    },
    {
        type: "number",
        name: "userPIN",
        message: "Enter your UserPIN:"
    },
    {
        type: "list",
        name: "accountType",
        choices: ["saving", "current"],
        message: "select your transaction:"
    },
    {
        type: "list",
        name: "transectionType",
        choices: ["FastCash", "Withdraw"],
        message: "Enter your transaction type:",
        when(answers: AnswerType) {
            return answers.accountType;
        }
    },
    {
        type: "list",
        name: "amount",
        choices: ["500", "1000", "2000", "5000", "10000", "20000"],
        message: "Enter your amount:",
        when(answers: AnswerType) {
            return answers.transectionType === "FastCash";
        }
    },
    {
        type: "number",
        name: "amount",
        message: "Enter your amount:",
        when(answers: AnswerType) {
            return answers.transectionType === "Withdraw";
        }
    }
]);

if (answer.userID && answer.userPIN) {
    const balance = Math.floor(Math.random() * 10000000);
    console.log(balance);
    const enteredAmount = answer.amount;
    if (balance >= enteredAmount) {
        const remaining = balance - enteredAmount;
        console.log("Your remaining balance is", remaining);
    } else {
        console.log("Insufficient balance");
    }
}