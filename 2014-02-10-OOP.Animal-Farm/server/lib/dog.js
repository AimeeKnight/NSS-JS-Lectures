function Dog(name, gender, age){
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.type = 'Dog';
}

// export Dog construction only
// export used alone exports everything
module.exports = Dog;
