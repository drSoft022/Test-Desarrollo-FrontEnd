<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="{{ asset('css/login.css') }}">
        <title>Login</title>
    </head>
    <body>
        <div class="container-login">
            <div class="left-container">
                <p class="text-center titleLogin">Bienvenido a la mejor plataforma <br><strong>organizacional online</strong></p>
            </div>
            <div class="right-container">
                <div class="login-form">
                    <h2 class="text-center m-4"><i class="fa-solid fa-brain fa-2x"></i> Psico <strong>Alianza</strong></h2>
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div class="form-group m-2">
                            <label for="email">Correo electrónico</label>
                            <input type="email" class="form-control" name="email" placeholder="Ingresa tu correo" required>
                        </div>
                        <div class="form-group m-2">
                            <label for="password">Contraseña</label>
                            <input type="password" class="form-control" name="password" placeholder="Ingresa tu contraseña" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block m-2">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>
