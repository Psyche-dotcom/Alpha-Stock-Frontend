import CommentCard from "@/components/card/comment-card";
import { commentList } from "@/constants";
import { IComment } from "@/interface/comment";
import { ArrowRightIcon, HomeIcon } from "@/utils/icons";
import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";

const BlogDetails = () => {
  return (
    <Box mt={8}>
      <Flex
        alignItems={"center"}
        gap={4}
        py={"8px"}
        px="16px"
        bg="#351F05"
        mb="16px"
        borderRadius={"8px"}
        width="fit-content"
      >
        <HomeIcon />
        <Text fontWeight={500} fontSize={14} color="#FFF">
          Blog
        </Text>
        <ArrowRightIcon />
        <Text fontWeight={500} fontSize={14} color="#FFF">
          What do members of congress know about these stocks that we don’t?
        </Text>
      </Flex>
      <Flex gap={8}>
        <Box bg="#fff" p={8} borderRadius={"12px"} width="100%">
          <Text fontWeight={600} fontSize={36} color="#111928" mb="8px">
            What do members of congress know about these stocks that we don’t?
          </Text>
          <Text fontWeight={500} fontSize={14} color="#111928" mb="32px">
            Written by <span className="font-bold">Joshua Martel</span> - August
            2, 2024
          </Text>
          <Box mb="32px">
            <Image
              height={501}
              width={896}
              alt="Single blog snap"
              src="/assets/images/card-image.png"
              className="object-cover"
            />
          </Box>
          <Text fontWeight={700} fontSize={16} color="#111928" mb="32px">
            Lorem ipsum dolor sit amet. Ut ratione fugit et alias fugiat est
            similique reprehenderit non nisi repellat ut voluptatibus officia et
            nemo dolore aut dolorum necessitatibus. Non dolor dolores vel esse
            deserunt et deleniti quis aut fugiat laboriosam cum omnis quisquam
            ea harum porro nam iste nemo. Ut modi voluptatem qui nostrum aliquid
            est quos vitae et deleniti modi qui Quis Quis. Eos nulla commodi non
            corporis labore quo accusamus voluptatibus ab molestias deleniti At
            nostrum unde a tempora facere sit eius itaque. Ut quas maiores sit
            quos voluptatibus ut consequatur modi. Est reprehenderit sint sit
            accusamus perferendis qui ratione dolorum et voluptates ducimus et
            autem similique eum excepturi dolor et harum pariatur? Eos tenetur
            laborum qui quia obcaecati 33 tempora magni. At optio quos sit autem
            earum eos doloribus accusamus.
          </Text>
          <Text fontWeight={700} fontSize={24} color="#111928" mb="8px">
            Lorem ipsum dolor sit amet. Ut ratione fugit et alias
          </Text>
          <Text fontWeight={700} fontSize={16} color="#111928" mb="32px">
            Lorem ipsum dolor sit amet. Ut ratione fugit et alias fugiat est
            similique reprehenderit non nisi repellat ut voluptatibus officia et
            nemo dolore aut dolorum necessitatibus. Non dolor dolores vel esse
            deserunt et deleniti quis aut fugiat laboriosam cum omnis quisquam
            ea harum porro nam iste nemo. Ut modi voluptatem qui nostrum aliquid
            est quos vitae et deleniti modi qui Quis Quis. Eos nulla commodi non
            corporis labore quo accusamus voluptatibus ab molestias deleniti At
            nostrum unde a tempora facere sit eius itaque. Ut quas maiores sit
            quos voluptatibus ut consequatur modi. Est reprehenderit sint sit
            accusamus perferendis qui ratione dolorum et voluptates ducimus et
            autem similique eum excepturi dolor et harum pariatur? Eos tenetur
            laborum qui quia obcaecati 33 tempora magni. At optio quos sit autem
            earum eos doloribus accusamus.
          </Text>
          <Box mb="32px">
            <Image
              height={501}
              width={896}
              alt="Single blog snap"
              src="/assets/images/card-image.png"
              className="object-cover"
            />
          </Box>
        </Box>

        <Flex flexDirection={"column"} gap={4} maxWidth={472}>
          {commentList.map((comment: IComment, index: number) => (
            <CommentCard comment={comment} key={index} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
export default BlogDetails;
