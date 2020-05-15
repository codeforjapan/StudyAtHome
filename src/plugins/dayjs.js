import dayjs from 'dayjs'

export default (_, inject) => {
  inject('dayjs', string => dayjs(string))
}
