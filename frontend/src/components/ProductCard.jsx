import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function ProductCard({
  id,
  title,
  categorie,
  price,
  tag,
  stock,
  addCart,
  addFavs,
  imageUrl,
}) {
  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src={imageUrl}
            srcSet={`${imageUrl}&dpr=2 2x`}
            loading="lazy"
            alt={`Imagem de ${title}`}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{categorie}</Typography>
        <Typography
          href="#product-card"
          color="neutral"
          textColor="text.primary"
          overlay
          sx={{ fontWeight: "md" }}
        >
          {title}
        </Typography>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              {tag}
            </Chip>
          }
        >
          {formatPrice(price)}
        </Typography>
        <Typography level="body-sm">
          {stock > 0 ? `Apenas ${stock} em estoque!` : "Produto esgotado!"}
        </Typography>
      </CardContent>

      <CardOverflow
        sx={{
          display: "flex",
          gap: 1,
          p: 1,
        }}
      >
        <Button
          variant="solid"
          color="danger"
          size="lg"
          onClick={addCart}
          disabled={stock === 0}
        >
          {stock > 0 ? "Adicionar ao carrinho" : "Indisponível"}
        </Button>

        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={addFavs}
          disabled={stock === 0}
        >
          {"Adicionar aos favoritos"}
        </Button>
      </CardOverflow>
    </Card>
  );
}
