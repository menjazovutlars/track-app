<template>
  <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
</template>

<script>
export default {
  name: 'DrawerLeft',
  props: {
    state: {
      type: Boolean
    }
  },
  data () {
    return {
      drawer: true
    }
  },
  provide: function () {
    return {
      openDrawer: this.openDrawer,
      changeDrawer: this.changeDrawer
    }
  },
  methods: {
    openDrawer () {
      this.drawer = !this.drawer
      return this.drawer
    }
  },
  computed: {
    changeDrawer: function () {
      return !this.drawer
    }
  }
}
</script>
