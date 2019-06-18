const messages = [
  '                                                                      ',
  ' Hi there..., We found you!!!                                         ',
  '                                                                      ',
  ' Feeling exicted in modern apps?                                      ',
  ' We are hiring for backend/frontend developers                        ',
  '                                                                      ',
  ' Send your resume to recruitment@xsis.co.id or WA/SMS to 085719478496 ',
  '                                                                      ',
  ' Cheers                                                               ',
  ' -Rdy-                                                                ',
  '                                                                      ',
  ' Good luck                                                            ',
  '                                                                      '
];

const styles = [
  'background: #03a9f4',
  'color: #fff',
  'font-size: 18px',
  'font-weight: bold',
  'display: block'
];

export default function greetings() {
  if (process.env.NODE_ENV === 'production') {
    if (typeof console === 'object') {
      console.info(`%c${messages.join('\n')}`, `${styles.join(';')}`);
    }
  }
}