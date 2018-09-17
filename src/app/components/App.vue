<template>
    <div id="app">
        <div>
          <nav class="navbar navbar-dark bg-primary">
            <a href="/" class="navbar-brand">Dialapp HUGCS</a>
            <div id="btnlogout" class="row mb-8">
              <button @click="logout" class="btn btn-outline-danger"> Cerrar Sesion </button>
            <h4>{{ msg }}</h4>
        </div>
          </nav>
        </div>
        <router-view></router-view>
      </div>
</template>