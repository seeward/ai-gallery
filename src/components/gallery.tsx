import React, { useRef, useEffect, useState } from "react";
import { Col, Divider, Row, Button, Card, Skeleton, Popover } from "antd";
import {
  ArtService,
  AIArtImage,
  fetchAIImagesReturnObject,
} from "./art.service";
import QrCode from "./qr-code";
const { Meta } = Card;

const AIGallery = () => {
  const _aiservice = new ArtService();
  const [count, saveCount] = useState<number>(4);
  const [skip, saveSkip] = useState<number>(0);
  const [total, saveTotal] = useState<number>(0);
  const [images, saveImage] = useState<AIArtImage[]>([]);

  const RenderDescription = (image: AIArtImage) => {
    return (
      <div>
        <h4>Seed: {image.seed}</h4>
        <img
          width={512}
          src={`https://ipfs.io/ipfs/${image.cid}`} // {`data:image/png;base64,${eachImage.image}`}
        />
        <hr />
        {/* <p>Prompt: {image.description}</p> */}
        <p>Guidance Scale: {image.g_scale}</p>
        <p>Iterations: {image.its}</p>
        <p>Display Resolution: {image.resolution}</p>

        
        <h4 style={{ textAlign: "left" }}>
          <QrCode cid={image.cid} />
        </h4>
      </div>
    );
  };
  const getImages = async () => {
    saveImage([]);
    const { total, images } = (await _aiservice.getImages(
      count,
      skip
    )) as fetchAIImagesReturnObject;
    saveImage(images);
    saveTotal(total);
  };

  useEffect(() => {
    getImages();
  }, [count, skip]);

  return (
    <div style={{ width: "75%", margin: 25, height: 600 }}>
      <Divider orientation="left">
        <br />
        {`${skip + 1}-${
          skip + count >= total ? total : skip + count
        } / ${total}`}{" "}
        &nbsp;&nbsp;
        <Button
          disabled={skip == 0}
          style={{ marginLeft: 25 }}
          onClick={() => {
            saveSkip(skip - count);
          }}
        >
          Prev
        </Button>
        <Button
          disabled={skip + count >= total}
          onClick={() => {
            saveSkip(skip + count);
          }}
        >
          Next
        </Button>
      </Divider>

      {images.length > 0 ? (
        <Row>
          {images.map((eachImage) => {
            return (
              <Col key={Math.random()} span={6}>
                <Card
                  style={{ margin: 25 }}
                  hoverable
                  cover={
                    <Popover
                      overlayStyle={{ width: 550 }}
               
                      content={RenderDescription(eachImage)}
                    >
                      <img
                        width={256}
                        src={`https://ipfs.io/ipfs/${eachImage.cid}`} // {`data:image/png;base64,${eachImage.image}`}
                      />
                    </Popover>
                  }
                >
                  {/* <Meta description={<h1>{eachImage.seed}</h1>} /> */}
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div>
          <Row style={{ margin: 25 }}>
            <Col>
              <Skeleton.Image
                active
                style={{ width: 200, height: 256, margin: 30 }}
              />
            </Col>
            <Col>
              <Skeleton.Image
                active
                style={{ width: 256, height: 256, margin: 30 }}
              />
            </Col>
            <Col>
              <Skeleton.Image
                active
                style={{ width: 256, height: 256, margin: 30 }}
              />
            </Col>
            <Col>
              <Skeleton.Image
                active
                style={{ width: 256, height: 256, margin: 30 }}
              />
            </Col>
          </Row>
          <hr />
          <Row></Row>
        </div>
      )}

      {/* <legend>AI Art Batch 01{" "}
        {`${skip + 1}-${
          skip + count >= total ? total : skip + count
        } / ${total}`} </legend> */}
    </div>
  );
};

export default AIGallery;
