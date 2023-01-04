<template>
  <form action="#" class="c-post-form" @submit.prevent="savePost">
    <UiForm type="|" item-margin-bottom="16">
      <template #default="{ itemClass, actionClass }">
        <UiFormField :class="itemClass">
          <small
            >Il post verrà automaticamente assegnato al
            <NuxtLink to="/profile">tuo utente</NuxtLink></small
          >
        </UiFormField>

        <UiFormField :class="itemClass">
          <UiTextfield
            :model="title"
            input-type="text"
            outlined
            @input="updateField('title', $event)"
          >
            Titolo
          </UiTextfield>
        </UiFormField>

        <UiFormField :class="itemClass">
          <UiTextfield
            :model="body"
            rows="8"
            input-type="textarea"
            outlined
            @input="updateField('body', $event)"
          >
            Descrizione
          </UiTextfield>
        </UiFormField>

        <UiFormField :class="itemClass">
          <div class="c-post-form__tags">
            <UiTextfield
              ref="tagInput"
              v-model="currentTag"
              outlined
              placeholder="Inserisci Tag"
              @enter="addOne"
            ></UiTextfield>
            <UiButton outlined @click="addOne"> Aggiungi </UiButton>
          </div>

          <UiChips type="input" :options="tags">
            <UiChip
              v-for="(tag, index) in tags"
              :key="tag"
              icon="face"
              @remove="removeTag(index)"
            >
              {{ tag }}
            </UiChip>
          </UiChips>
        </UiFormField>

        <UiFormField :class="itemClass">
          <label v-badge="form.reactions.toString()"
            >Numero di reazioni assegnate:</label
          >
          <UiSlider
            type="discrete"
            :min="0"
            :max="9"
            :model="reactions"
            @change="updateField('reactions', $event)"
          ></UiSlider>
        </UiFormField>

        <UiFormField :class="actionClass">
          <UiButton native-type="submit" type="raised">{{
            isNew ? 'Salva' : 'Aggiorna'
          }}</UiButton>
        </UiFormField>
      </template>
    </UiForm>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Method } from 'axios'
import { AccountState } from '@/store/account'

type PostFormData = {
  title: string
  body: string
  tags: string[]
  reactions: number
}

export default Vue.extend({
  name: 'PostForm',
  props: {
    title: {
      type: String,
      default: '',
    },
    body: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
    reactions: {
      type: Number,
      default: 0,
    },
    postId: {
      type: [Number, Boolean],
      default: false,
    },
  },
  data() {
    const form: PostFormData = {
      title: this.title,
      body: this.body,
      tags: this.tags as string[],
      reactions: this.reactions,
    }

    return {
      currentTag: '',
      form,
    }
  },
  computed: {
    ...mapState('account', {
      accountId: (state: any): number | null => {
        return (state as AccountState).account?.id || null
      },
    }),
    isNew(): boolean {
      return typeof this.postId === 'boolean'
    },
  },
  methods: {
    updateField(field: string, value: string | number | string[]): void {
      if (
        !this.form ||
        !Object.prototype.hasOwnProperty.call(this.form, field)
      ) {
        return
      }

      // NOTE: usare la brackets notation dava errore nel compilatore TS
      this.form = {
        ...this.form,
        [field]: value,
      }
    },
    addOne(): void {
      if (this.currentTag.trim().length) {
        if (this.form.tags.includes(this.currentTag)) {
          this.$toast({
            message: 'Tag già presente',
            className: 'is-error',
          })
          return
        }

        this.form.tags.push(this.currentTag)
        this.currentTag = ''
      }
    },
    removeTag(index: number): void {
      this.form.tags.splice(index, 1)
    },
    savePost(event: Event): void {
      const tagInput = this.$refs.tagInput as Vue
      const input: HTMLInputElement | null = tagInput.$el.querySelector('input')

      // Bypassa l'invio se questo parte dalla miniform interna per i tag
      if (input && document.activeElement === input) {
        event.preventDefault()
        return
      }

      const data = {
        ...this.form,
        userId: this.accountId,
      }

      let method: Method = 'POST'
      let url = 'https://dummyjson.com/posts/add'

      if (!this.isNew) {
        method = 'PUT'
        url = `https://dummyjson.com/posts/${this.postId}`
      }

      this.$axios({
        url,
        method,
        data
      })
        .then((raw) => raw.data)
        .then((response: Post) => {
          this.$emit('saved', response)
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    },
  },
})
</script>

<style lang="scss">
.c-post-form {
  &__tags {
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;

    .mdc-text-field {
      flex: 1 1 auto;

      &.mdc-text-field--outlined {
        .mdc-notched-outline {
          .mdc-notched-outline__trailing {
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }
    }
    .mdc-button {
      height: auto;
      flex: 0 0 auto;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .mdc-text-field {
    &,
    input {
      width: 100%;
    }
  }

  .mdc-button[type='submit'] {
    width: 100%;
  }

  .mdc-slider {
    width: calc(100% - 48px);
  }

  .mdc-badge {
    label {
      margin-right: 4px;
    }
  }
}
</style>
