import { Header } from 'components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Шесть городов. Мы еще не придумали страницу по этому адресую</title>
      </Helmet>

      <Header />

      <main className="page__main"
        style={{
          fontSize: '50px',
          textAlign: 'center',
        }}
      >
        <h1>Мы еще не придумали страницу по этому адресу.</h1>
        <Link to="/">
          Нажми, чтобы вернуться на главную страницу!
        </Link>
      </main>

    </>
  );
}


export default NotFoundPage;
