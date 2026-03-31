<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Login</title>
<link rel="stylesheet" href="css/style.css">
</head>

<body>

<div class="main">
<h1>Login</h1>

<div class="card">

<form id="login-form">

<label for="email">Email</label>
<input type="email" id="email" required>

<label for="password">Password</label>
<input type="password" id="password" required>

<button type="button" id="toggle-password">Show</button>

<button type="submit">Login</button>

</form>

<p>Don't have an account? <a href="signup.html">Sign Up</a></p>

<form action="dashboard.html">
<button type="submit">Continue as Guest</button>
</form>

</div>
</div>

<script src="js/app.js"></script>
</body>
</html>
