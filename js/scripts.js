// Business logic for AddressBook -----
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}
AddressBook.prototype.findContact = function(id){
  for (var i=0; i<this.contacts.length; i++){
    if (this.contacts[i]){
      if (this.contacts[i].id == id){
        return this.contacts[i];
     }
    }
  };
  return false;
}
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]){
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }  
  };
  return false;
}

// Business logic for contacts -----
function Address(addressOne, addressTwo) {
  this.addressOne = addressOne;
  this.addressTwo= addressTwo;
}

function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.addresses = [];
 
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.addAddress = function(address) {
  this.addresses.push(address);
};

// User Interface Logic ----------

var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  console.log("CONTACTS: ", addressBookToDisplay.contacts);
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName  + "</li>";
   });
   contactsList.html(htmlForContactInfo)
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
};

function showAddress(addressId){
  var address = addressBook.findAddress(addressId);
  $("show-address").show();
  $("#address-one").html(address.addressOne);
  $("#address-two").html(address.addressTwo);
}


 /* var buttons = $("#buttons"); {
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
} */

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
     showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedAddress1 = $("input#address-one").val();
    var inputtedAddressType1 = $("input#address-type").val();
    var inputtedAddress2 = $("input#address-two").val();
    console.log("Input address: ", inputtedAddress2);
    var inputtedAddressType2 = $("input#address-type2").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#address-one").val("");
    $("input#address-type").val("");
    $("input#address-two").val("");
    $("input#address-type2").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
    addressBook.addContact(newContact);
    var addressOne = new Address(inputtedAddress1, inputtedAddressType1);
    var addressTwo = new Address(inputtedAddress2, inputtedAddressType2);
    newContact.addAddress(addressOne);
    newContact.addAddress(addressTwo);
    console.log("Addresses after addContact: ", addressBook);
    
    displayContactDetails(addressBook);
  })
})
