<template>
  <v-data-table v-model="selected" :headers="headers" :items="books"
    item-key="isbn" select-all class="elevation-1">
    <template slot="items" slot-scope="props">
      <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
      <td class="text-xs-center">{{props.item.isbn}}</td>
      <td class="text-xs-center">{{props.item.title}}</td>
      <td class="text-xs-center">{{props.item.author}}</td>
      <td class="text-xs-center">{{props.item.published_year}}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      selected: [],
      headers: [
        { text: 'ISBN', align: 'center', sortable: true, value: 'isbn' },
        { text: '제목', align: 'center',sortable: true, value: 'title' },
        { text: '저자', align: 'center',sortable: true, value: 'author' },
        { text: '출간일', align: 'center', sortable: true, value: 'published_year' }
      ]
    }
  },
  async asyncData({ $axios }) {
    const books = await $axios.$get('/api/book')
    return {
      books
    }
  }
}
</script>
