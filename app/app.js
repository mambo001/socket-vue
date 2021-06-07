let currentMessage = []


const socket = io('ws://localhost:8080');

socket.on('message', text => {

    const el = document.createElement('li');
    el.classList = ['collection-item']
    el.innerHTML = text;
    document.querySelector('#messagesList').appendChild(el)

});



// document.querySelector('button').onclick = () => {

//     const text = document.querySelector('input').value;
//     socket.emit('message', text)
    
// }

// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
Vue.component('textarea-chat', {
  data: function () {
    return {
      value: ''
    }
  },
  template: `
  <div class="input-field col s12">

    <i class="material-icons prefix">mode_edit</i>

    <textarea 
      id="text1"
      class="materialize-textarea"
      @input="valueChanged"
      @keyup.enter="submitMessage"
    >
   </textarea>

    <label for="text1" class="active">Message</label>
  </div>
  `,
  methods: {
    valueChanged: function(e) {
      console.log(e.target.value)
      currentMessage = e.target.value
    },
    submitMessage: function(e) {

      socket.emit('message', currentMessage)
      e.target.value = ''

    }
  }
})


Vue.component('button-submit', {
  data: function () {
    return {
      count: 0
    }
  },
  template: `
    <button 
      style="width: 100%" 
      class="btn blue waves-effect waves-light" 
      type="submit" 
      name=""
      @click="submitMessage"
    >
      Submit
      <i class="material-icons right">send</i>
    </button>
  `,
  methods: {
    submitMessage: function() {

      socket.emit('message', currentMessage)

    }
  }
})

const Play = { template: `
  <div class="container">
    <h1>Play</h1>
  </div>
` }
const Rooms = { 
  template: `
  <div class="container">
    <h1>Rooms</h1>

    <div class="row">
      <ul class="collection col s12" id="messagesList">
      </ul>
      <form class="col s12">
        <div class="row">

          <textarea-chat></textarea-chat>
          <button-submit></button-submit>

        </div>
      </form>
    </div>
  </div>
` }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/play', component: Play },
  { path: '/rooms', component: Rooms }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app')