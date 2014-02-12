function Cat(name, gender, age){
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.type = 'Cat';
}

// export Cat construction only
// export used alone exports everything
module.exports = Cat;
