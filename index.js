import * as yup from 'yup';

export default class Main {
  static async run() {
    const schema = yup.object().shape({
      field1: yup.string().when(
        'field2',
        {
          is: (value) => !!value,
          then: yup.string().required(),
        }
      ),
      field2: yup.string().when(
        'field1',
        {
          is: (value) => !!value,
          then: yup.string().required(),
        }
      ),
    });
    try {
      await schema.validate({
        field1: 'foo',
      });
    } catch (e) {
      console.log('e=',e);
    }
  }
}

Main.run();
