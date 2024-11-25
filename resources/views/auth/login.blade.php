<form method="POST" action="{{ route('login') }}">
    @csrf

    <input type="email" name="email" :value="old('email')" required autofocus autocomplete="username" >
    <input type="password" name="password" required autocomplete="current-password" >
    <input type="submit" value="">
</form>
