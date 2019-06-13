const fs = require('fs')
const {waterfall} = require('async')
const {print} = require('./helpers')

const START_FILE = '{"skus": ['
const FILE_NAME = 'message.txt'

function writeFile(stats, data, cb) {
  waterfall([isNewFile, write(stats, data)], commonCallback)
  function commonCallback(err, data) {
    cb(err, stats, data)
  }
}

function isNewFile(cb) {
  fs.stat(FILE_NAME, (err, statsData) => {
    if (err && err.errno === -2) {
      return cb(null, {newfile: true})
    }
    if (err) {
      return cb(err)
    }
    return cb(null, {newfile: false, stats: statsData})
  })
}

function write(stats, data) {
  return (statsData, cb) => {
    const preparedData = toStr(data)
    const dataStr = statsData.newfile
      ? `${START_FILE}${preparedData}`
      : `,${preparedData}`

    fs.appendFile(FILE_NAME, dataStr, function(err) {
      if (err) throw err
      console.log('Saved!')
      cb(null, stats, data)
    })
  }
}

function EOF(cb) {
  fs.appendFile(FILE_NAME, ']}', cb)
}
// `{"id":${id},"cert_num":${cert_num},"data":${data}},"data_hash":${data_hash}`
function toStr(data /*: Array */) {
  const strings = data.map(
    ({id, data, data_hash, additional_data: {cert_num}}) => {
      const o = {id, cert_num, data, data_hash}
      return JSON.stringify(o)
    }
  )
  return strings.join(',')
}
const a = {
  id: '0000ac23-1b5a-4437-8382-a9b842993dbc',
  cert_num: 'ЛП-003789',
  data: {
    address: {
      company: {
        id: 'b7383739-ec2e-4827-a294-4305c3ee757d',
        name: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ОЗОН"',
      },
      country: 'РОССИЯ',
      country_id: 'e2c0eb1c-6e61-46eb-9040-57c8defe63ba',
      id: '9a791cbc-9da3-45e6-a98d-d2ab175ad090',
      title: '445351, г. Жигулевск, Самарская обл., ул. Гидростроителей, 6',
    },
    cert_num: 'ЛП-003789',
    is_recipe: true,
    man_forms: [
      {
        dosage_form: {
          id: 'dd92922c-be08-4f7d-a233-e60d282c4665',
          name: 'таблетки, покрытые кишечнорастворимой оболочкой',
        },
        inns: [
          {
            count: 0.1,
            count_end: null,
            inn: {
              code: '005431',
              id: '78a729d9-93e4-41dc-bfaa-4c4be168c55f',
              is_inn: true,
              name_eng: 'pentoxifylline',
              name_lat: 'pentoxifyllinum',
              name_rus: 'пентоксифиллин',
            },
            measure_unit: {
              code: '002',
              id: '5d4f8663-d75e-4c69-a3fc-c0b8036d896a',
              name: 'грамм',
              sign: 'г',
            },
          },
        ],
        key: 'f2b5c07c41a0eda825c211350e37e326f5716edd5be41b6a250633a42f45b45f',
        shelf_life: '3 года',
        storage_conditions:
          'В защищенном от света месте, при температуре не выше 25 град.',
      },
    ],
    packs: [
      {
        count: 1,
        count_end: null,
        level_type: 'primary',
        man_form_packs: [
          {
            count: 10,
            count_end: null,
            man_form_key:
              'f2b5c07c41a0eda825c211350e37e326f5716edd5be41b6a250633a42f45b45f',
            measure_unit: {
              code: '901',
              id: 'f8d9c546-c4c4-465b-a2ac-398ba9794921',
              name: 'штука',
              sign: 'шт',
            },
          },
        ],
        type: {
          id: '96b92d30-b8b8-4a1d-b4c7-d9f05b5f40cb',
          name: 'упаковка контурная ячейковая (блистер)',
        },
      },
      {
        count: 1,
        count_end: null,
        level_type: 'consumer',
        type: {
          id: '37d25638-0365-43b8-b87b-f1837a2b30b2',
          name: 'пачка картонная',
        },
      },
    ],
    purpose: null,
    trade_name: 'пентоксифиллин',
  },
}

module.exports = {
  EOF,
  writeFile,
}
