import { Box } from "@chakra-ui/react";

interface IHomeSectionProps {
  textRight?: boolean;
  heading: string;
  buttonName: string;
  image: string;
}

const HomeSection = ({
  textRight,
  heading,
  buttonName,
  image,
}: IHomeSectionProps) => {
  return (
    <Box display="flex" justifyContent="center" w="100%" minHeight="200px">
      <Box>{heading}</Box>
      <Box>{image}</Box>
    </Box>
  );
};

export default HomeSection;
