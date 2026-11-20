export default class Student {
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }

    getGrade() {
        return this.grade;
    }

    setName(name) {
        this.name = name;
    }

    setAge(age) {
        this.age = age;
    }

    setGrade(grade) {
        this.grade = grade;
    }
}