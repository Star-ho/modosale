class Error {
    constructor(message) {
        this.message = message;
    this.name = "Error"; // (name은 내장 에러 클래스마다 다릅니다.)
    }
}

class ParseError extends Error {   
    constructor(message) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}