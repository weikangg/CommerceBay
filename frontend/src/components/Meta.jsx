import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "CommerceBay",
  description: "We sell the best products at cheap prices",
  keywords: "electronics, buy electronics, cheap electroincs",
};

export default Meta;
