var urlBase = 'https://cop4331contactmanager.us/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

// Global Variables for Actions delete and edit
var fname = "";
var lname = "";
var emailaddy = "";
var phonenum = "";
var homeaddy = "";

function doLogin(emptyuserpass, emptyuser, emptypass, errorUser) // This function gets the users login and password, sends it to PHP through a JSON package,
{																// then allows the user access if their creds exist in the DB
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	
	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		if( userId < 1 )
		{
			checkError(emptyuserpass, emptyuser, emptypass, errorUser);
			document.getElementById("loginButton").insertAdjacentHTML("afterend", 
                "<p style = 'color: red;' id = 'errorUser'> Username or password is incorrect. </p>"
                                                                      );
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
		
		window.location.href = "mainPage.html";
	}
	catch(err)
	{
		document.getElementById("loginButton").innerHTML = err.message;
	}

}

function welcomeUser() // This function is called in the onload tag of the mainPage.html, it welcomes the user on a name basis
{
	readCookie();
	document.getElementById("userwelcome").insertAdjacentHTML("afterbegin", 
	"<p class = 'descriptions' id = 'welcome'> Welcome, " + firstName + "!</p>"
														  );
	getTable();
}

function userEmpty()	// This function ensures the user cannot attempt to login with blank credentials. 
{
	var user = document.getElementById("loginName").value;
	var pass = document.getElementById("loginPassword").value;
	var emptyuserpass = document.getElementById("empty");
	var emptyuser = document.getElementById("emptyusername");
	var emptypass = document.getElementById("emptypassword");
	var errorUser = document.getElementById("errorUser");

	if (user == "" && pass == "")
	{
		checkError(emptyuserpass, emptyuser, emptypass, errorUser);

		document.getElementById("loginButton").insertAdjacentHTML("afterend", 
		"<p style = 'color: red;' id = 'empty'> Please enter a username and password.</p>"
															  );
	}
	else if (user != "" && pass == ""){

		checkError(emptyuserpass, emptyuser, emptypass, errorUser);

		document.getElementById("loginButton").insertAdjacentHTML("afterend", 
		"<p style = 'color: red;' id = 'emptypassword'> Please enter a password.</p>"
															  );
	}
	else if (user == "" && pass != ""){

		checkError(emptyuserpass, emptyuser, emptypass, errorUser);

		document.getElementById("loginButton").insertAdjacentHTML("afterend", 
		"<p style = 'color: red;' id = 'emptyusername'> Please enter a username.</p>"
															  );
	}
	else 
	{
		doLogin(emptyuserpass, emptyuser, emptypass, errorUser);
	}
}
function checkError(emptyuserpass, emptyuser, emptypass, errorUser)	// Simply removes the previous "user/pass incorrect" message if it exists if the html
{
	if (document.contains(emptyuserpass))
		emptyuserpass.remove();

	else if (document.contains(emptyuser))
		emptyuser.remove();

	else if (document.contains(emptypass))
		emptypass.remove();

	else if (document.contains(errorUser))
		errorUser.remove();
}


function saveCookie()	// Saves a cookie consisting of the current users info
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() // Reads the current users info and saves it in the proper variable
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
}

function doLogout()
{
	var now = new Date();
	var time = now.getTime();
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addUser()	// Sends a JSON package with the user information to be added, then the PHP contacts the DB and adds the user
{
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	var login = document.getElementById("login").value;
	var password = document.getElementById("password").value;
	document.getElementById("userAddResult").innerHTML = "";

	if (firstname.length == 0 || lastname.length == 0 || login.length == 0 || password.length == 0) // This entire if block ensures all info is filled out
	{
		var firststar = document.getElementById("firststar");
		var laststar = document.getElementById("laststar");
		var loginstar = document.getElementById("loginstar");
		var passstar = document.getElementById("passstar");
		if (firstname == "")
		{
			if (document.contains(firststar))
				firststar.remove();

			document.getElementById("firstname").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'firststar'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(firststar))
				firststar.remove();
		}
		if (lastname == "")
		{
			if (document.contains(laststar))
				laststar.remove();

			document.getElementById("lastname").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'laststar'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(laststar))
				laststar.remove();
		}
		if (login == "")
		{
			if (document.contains(loginstar))
				loginstar.remove();

			document.getElementById("login").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'loginstar'> *required</r>"
															  );	
		}
		else
		{
			if (document.contains(loginstar))
				loginstar.remove();
		}
		if (password == "")
		{
			if (document.contains(passstar))
				passstar.remove();

			document.getElementById("password").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'passstar'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(passstar))
				passstar.remove();
		}
		
	}
	else	// Form the JSON payload and send it for the PHP to grab
	{
		var jsonPayload = '{"firstname" : "' + firstname + '", "lastname" : "' + lastname + '", "login" : "' + login + '", "password" : "' + password + '"}';
		var url = urlBase + '/AddUser.' + extension;
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) // On successfully adding the user to DB close modal
				{
					modal.style.display = "none"
					document.getElementById("loginframe").insertAdjacentHTML("afterend", 
					"<div class = 'successuser'> <br> <p class = 'success'> Account Added Successfully! </p></div>"
																		);
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("userAddResult").innerHTML = err.message;
		}
		
	}
	
}


function addContact() // Pretty similar to add user
{
	var firstname = document.getElementById("firstnameadd").value;
	var lastname = document.getElementById("lastnameadd").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var address = document.getElementById("address").value;
	document.getElementById("contactAddResult").innerHTML = "";
	
	readCookie();

	if (firstname.length == 0 || lastname.length == 0 || email.length == 0 || phone.length == 0 || address.length == 0) // Ensures all the info is filled out
	{
		var firstreq = document.getElementById("firstreq");
		var lastreq = document.getElementById("lastreq");
		var emailreq = document.getElementById("emailreq");
		var phonereq = document.getElementById("phonereq");
		var addrreq = document.getElementById("addrreq");

		if (firstname == "")
		{
			if (document.contains(firstreq))
				firstreq.remove();

			document.getElementById("firstnameadd").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'firstreq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(firstreq))
				firstreq.remove();
		}
		if (lastname == "")
		{
			if (document.contains(lastreq))
				lastreq.remove();

			document.getElementById("lastnameadd").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'lastreq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(lastreq))
				lastreq.remove();
		}
		if (email == "")
		{
			if (document.contains(emailreq))
				emailreq.remove();

			document.getElementById("email").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'emailreq'> *required</r>"
															  );	
		}
		else
		{
			if (document.contains(emailreq))
				emailreq.remove();
		}
		if (phone == "")
		{
			if (document.contains(phonereq))
				phonereq.remove();

			document.getElementById("phone").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'phonereq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(phonereq))
				phonereq.remove();
		}
		if (address == "")
		{
			if (document.contains(addrreq))
				addrreq.remove();

			document.getElementById("address").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'addrreq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(addrreq))
				addrreq.remove();
		}
		
	}

	else	// Form the JSON payload and send it for the PHP to grab
	{
		var jsonPayload = '{"firstname" : "' + firstname + '", "lastname" : "' + lastname + '", "email" : "' + email + '", "phone" : "' + phone + '", "address" : "' + address + '", "userId" : "' + userId + '"}';
		var url = urlBase + '/AddContact.' + extension;
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function()  // On success close the modal
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					modal.style.display = "none"
					location.reload();
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("contactAddResult").innerHTML = err.message;
		}
	}
	
}

function getTable()
{
	var jsonPayload = '{"userId" : "' + userId + '"}';
	var url = urlBase + '/GetContacts.' + extension;
	console.log(jsonPayload);
	console.log(userId)

	// jQuery starts
	var table = $('#contactTable').DataTable({
		"searching": true,
		"lengthMenu": [[5, 10, 15], [5, 10, 15]],
		"pageLength": 15,
		//"processing": true,
		//"serverSide": true,
		"ajax": {
			url: "https://cop4331contactmanager.us/LAMPAPI/GetContacts.php",
			type: "POST",
			dataSrc: "",
			data: {
				"userId": userId
			},
		},
		columns: [
			{data: "FName"},
			{data: "LName"},
			{data: "Email"},
			{data: "Phone"},
			{data: "Address"},
			{
				"className": '',
				"data": null,
				"render": function(data, type, full, meta)
				{
					   return '<button id = "editbutton" class="editbtn">Edit</button><r> </r><button  id = "deletebutton" class="deletebtn">Delete</button>';
				}
			},
		]
	});

	
	$("#contactTable_paginate").addClass('tableinfo'); // Pages
	$("#contactTable_filter").addClass('tableinfo'); // Search
	$("#contactTable_length").addClass('tableinfo'); // Show x Entries
	$("#contactTable_info").addClass('tableinfo'); // Showing entry numbers
	$("#contactTable_wrapper").addClass('data');
	$("#contactTable").css("border",  "4px solid grey");
	

	$('#contactTable tbody').on('click', '#deletebutton', function () {
		var data = table.row($(this).parents('tr')).data();
		fname = data[0];
		lname = data[1];
		emailaddy = data[2];
		phonenum = data[3];
		homeaddy = data[4];
		deleteContact();
	});

	$('#contactTable tbody').on('click', '#editbutton', function () {
		var data = table.row($(this).parents('tr')).data();
		fname = data[0];
		lname = data[1];
		emailaddy = data[2];
		phonenum = data[3];
		homeaddy = data[4];
		editContact();
	});
	// jQuery ends

	document.getElementById("contactTable_filter").innerHTML.replace()

}



function deleteContact()
{
	var jsonPayload = '{"firstname" : "' + fname + '", "lastname" : "' + lname + '", "email" : "' + emailaddy + '", "phone" : "' + phonenum + '", "address" : "' + homeaddy + '", "userId" : "' + userId + '"}';
	var url = urlBase + '/DeleteContact.' + extension;
	console.log(jsonPayload);
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) // On successfully adding the user to DB close modal
				{
					location.reload();
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			console.log("error contact not deleted.");
		}
}

function editContact()
{
	document.getElementById("modaladdcontact").insertAdjacentHTML("afterend", 
				"<div id='editbuttoncontact'>" +
				"<div class='modaleditting' id = 'modaledit'>" +
						"<div class='modal-content'>"+
							" <span class='close-btn'></span>" +
							"<div class='container'>"+
							"<br>"+
								"<u style='color: rgb(83, 83, 83);'>"+
									"<h1 id='heading' style='font-size: x-large;'>Edit Contact</h1>"+
								"</u>"+
								"<p class = 'descriptions'>Please make any necessary changes.</p>"+
								"<hr>"+
								"<br><br>"+
								"<form>"+
									"<div style='text-align: center;'>"+
										"<span class='fa fa-user icon' style='color: rgb(61, 189, 133);' aria-hidden='true'></span>"+
										"<input id = 'firstnameedit' type='text' class='logininputs' placeholder='First Name' value = '" + fname + "'></input>"+
										"<br><br>"+
										"<span class='fa fa-user icon' style='color: rgb(61, 189, 133);' aria-hidden='true'></span>"+
										"<input id = 'lastnameedit' type='text' class='logininputs' placeholder='Last Name' value = '" + lname + "'></input>"+
										"<br><br>"+
										"<span class='fa fa-envelope' style='color: rgb(61, 189, 133);' aria-hidden='true'></span>"+
										"<input id = 'emailedit' type='text' class='logininputs' placeholder=' Email' value = '" + emailaddy + "'></input>"+
										"<br><br>"+
										"<span class='fa fa-phone' style='color: rgb(61, 189, 133);' aria-hidden='true'></span>"+
										"<input id = 'phoneedit' type='phone-number' class='logininputs' placeholder=' Phone Number' value = '" + phonenum + "'></input>"+
										"<br><br>"+
										"<span class='fa fa-home' style='color: rgb(61, 189, 133);' aria-hidden='true'></span>"+
										"<input id = 'addressedit' type='address' class='logininputs' placeholder=' Address' value = '" + homeaddy + "'></input>"+
									"</div>"+
								"</form>"+
								"<br><br>"+
								"<div>"+
									"<input id = 'editcontact' type='button' class='signupbtn' value = 'Save Contact' onclick = 'updateContact();'></input>"+
									"<input id = 'canceledit' type='button' class='signupbtn' value = 'Cancel' onclick = 'removeHTML();'></input>"+
								"</div>"   +
							"</div>"+
						"</div>"+
				"</div>"+
			"</div>");
			var modalBtnedit = document.getElementById("editbutton");
			var modaledit = document.querySelector(".modaleditting");
			modalBtnedit.onclick = function () {
					modaledit.style.display = "block";
			}	
}

function removeHTML()
{
	var modalBtnedit = document.getElementById("editbutton");
	var modaledit = document.querySelector(".modaleditting");
	var remove = document.getElementById("editbuttoncontact");
	remove.remove();
	modaledit.style.display = "none";
}
function updateContact()
{
	var firstnamee = document.getElementById("firstnameedit").value;
	var lastnamee = document.getElementById("lastnameedit").value;
	var emaile = document.getElementById("emailedit").value;
	var phonenume = document.getElementById("phoneedit").value;
	var addresse = document.getElementById("addressedit").value;
	var jsonPayload = '{"firstnameo" : "' + fname + 
						'", "lastnameo" : "' + lname + 
						'", "emailo" : "' + emailaddy + 
						'", "phoneo" : "' + phonenum + 
						'", "addresso" : "' + homeaddy + 
						'", "userId" : ' + userId + 
						', "firstnamee" : "' + firstnamee +
						'", "lastnamee" : "'+ lastnamee +
						'", "emaile" : "'+ emaile +
						'", "phonenume" : "' + phonenume + 
						'", "addresse" : "' + addresse + '"}';
	var url = urlBase + '/UpdateContact.' + extension; 

	if (firstnamee.length == 0 || lastnamee.length == 0 || emaile.length == 0 || phonenume.length == 0 || addresse.length == 0) // Ensures all the info is filled out
	{
		var firstreq = document.getElementById("firstreq");
		var lastreq = document.getElementById("lastreq");
		var emailreq = document.getElementById("emailreq");
		var phonereq = document.getElementById("phonereq");
		var addrreq = document.getElementById("addrreq");

		if (firstnamee == "")
		{
			if (document.contains(firstreq))
				firstreq.remove();

			document.getElementById("firstnameedit").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'firstreq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(firstreq))
				firstreq.remove();
		}
		if (lastnamee == "")
		{
			if (document.contains(lastreq))
				lastreq.remove();

			document.getElementById("lastnameedit").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'lastreq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(lastreq))
				lastreq.remove();
		}
		if (emaile == "")
		{
			if (document.contains(emailreq))
				emailreq.remove();

			document.getElementById("emailedit").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'emailreq'> *required</r>"
															  );	
		}
		else
		{
			if (document.contains(emailreq))
				emailreq.remove();
		}
		if (phonenume == "")
		{
			if (document.contains(phonereq))
				phonereq.remove();

			document.getElementById("phoneedit").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'phonereq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(phonereq))
				phonereq.remove();
		}
		if (addresse == "")
		{
			if (document.contains(addrreq))
				addrreq.remove();

			document.getElementById("addressedit").insertAdjacentHTML("afterend", 
			"<r style = 'color: red;' id = 'addrreq'> *required</r>"
															  );
		}
		else
		{
			if (document.contains(addrreq))
				addrreq.remove();
		}
	}
	else
	{	
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) // On successfully adding the user to DB close modal
				{
					location.reload();
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			console.log("error contact not deleted.");
		}
	}
}