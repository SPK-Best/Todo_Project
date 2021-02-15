<template>
  <div>
    <v-content>
      <v-container>
        <p class="headline">{{ day }}, {{ date }}{{ ord }} {{ year }}</p>
        <v-container fill-height fluid>
          <v-row align="center"
                 justify="center">
            <v-col
                cols="12"
                sm="6"
                md="4"
            >

              <v-text-field
                  label="Add Todo"
                  outlined
                  v-model="newTask"
              >
              </v-text-field>

            </v-col>

            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  label="Due Date"
                  type="date"
                  v-model="finishDate"
              ></v-text-field>

            </v-col>

            <v-btn @click="addItem"
                   color="#43A047">
              Add Task
            </v-btn>

          </v-row>
        </v-container>

        <v-divider class="mb-3"></v-divider>

        <v-toolbar>
          <v-tabs
              background-color="yellow"
              grow
          >

            <v-tab>
              <strong class="mx-3 info--text text--darken-3"> Active: {{ calculateRemaining }} </strong>
            </v-tab>

            <v-tab>
              <strong class="mx-3 green--text"> Completed: {{ calculateCompleted }} </strong>
            </v-tab>

          </v-tabs>
        </v-toolbar>

        <v-divider vertical></v-divider>

        <v-spacer></v-spacer>

        <strong class="mx-3 black--text"> Task Completed {{ calculateProgress }} % </strong>

        <v-progress-circular :value="calculateProgress" class="mr-2"></v-progress-circular>

        <v-divider class="mb-3"></v-divider>

        <v-card v-for="items in todos" v-bind:key="items.text" v-model="newTask" color="#90CAF9">
          <v-card-title>
            <v-checkbox v-model="items.done" color="success">
              <div
                  slot="label"
                  :class="(items.done && 'text-decoration-line-through') || 'text--primary'"
                  v-text="items.text"
              >Line-through text
              </div>
            </v-checkbox>
            <v-list-item-title>Due Date: {{ items.finishDate }}</v-list-item-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="blue">mdi-plus</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="removeTodo(items.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-divider></v-divider>
        <br>
        <v-btn
            color="#E53935"
            type="submit"
            class="mr-4"
            @click="userLogout">
          Logout
        </v-btn>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import firebase from "firebase";
import 'firebase/database';

export default {
  name: "Todo",
  data() {
    return {
      user: null,
      todoRef: null,
      todos: {},
      finishDate: '',
      tasks: [],
      newTask: null,
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
    };
  },
  created() {
    this.todoRef = firebase.database().ref(`/users/${this.$store.state.auth.user.uid}`);
  },
  mounted() {
    this.todoRef.on('value', (snapshot) => {
      this.todos = snapshot.val();
      console.log(this.todos);
    });
  },
  computed: {
    calculateCompleted() {
      return this.tasks.filter(task => task.done).length;
    },
    calculateProgress() {
      if ((isNaN(this.calculateCompleted / this.tasks.length) * 100)) {
        return 100;
      } else {
        return (this.calculateCompleted / this.tasks.length) * 100;
      }
    },
    calculateRemaining() {
      return this.tasks.length - this.calculateCompleted;
    }
  },
  methods: {
    userLogout() {
      firebase.auth()
          .signOut()
          .then(() => {
            this.$store.dispatch('userLogout', null);
            this.$router.push('/login')
          })
    },
    addItem() {
      const new_task = this.newTask.text;
      const date = this.finishDate
      if (new_task !== '' && date !== '') {
        this.todoRef.push({
          text: this.newTask.trim(),
          isDone: false,
          finishDate: this.finishDate,
        });
      } else {
        alert("Please fill in both Todo and Due date")
      }
      this.newTask = '';
      this.finishDate = '';
    },
    removeTodo(index) {
      firebase
          .database()
          .ref(`users/${this.$store.state.auth.user.uid}/${index}`)
          .set({});
    },
    todoDay() {
      const d = new Date();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[d.getDay()];
    },
    nth(d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
  }
};
</script>