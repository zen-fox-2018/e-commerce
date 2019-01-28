<template>
    <v-menu offset-y flat>
      <v-btn
        slot="activator"
        color="#B43244"
      >
      <v-icon>list</v-icon>
      <span>
        Categories
      </span>
      <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Belum Jadi' },
      { title: 'Masih Kosong' },
      { title: 'Insya Allah akan ditambahkan' },
      { title: 'hehehehe' }
    ]
  })
}
</script>
