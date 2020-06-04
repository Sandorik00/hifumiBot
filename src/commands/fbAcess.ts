import * as firebase from '../modules/firebase'

module.exports =
{
          name: 'fbAcess',
          async run(message, args)
          {
                    firebase.readCollection(args[1]);
          }
}