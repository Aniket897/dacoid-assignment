import { NextFunction, Request, Response } from "express";
import { generate } from "shortid";
import Url from "../models/url";
import { formatUrl, formatUrlList } from "../helpers";
import url from "../models/url";

const shortUrl = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const user = req.user;

    if (!url) {
      resp.status(400).json({
        message: "url is required",
      });
      return;
    }

    const shortId = generate();

    const newUrl = await Url.create({
      originalUrl: url,
      userId: user,
      shortId,
    });

    console.log(newUrl);

    resp.status(200).json({
      message: "url shorted successfully",
      url: {
        id: newUrl._id,
        originUrl: newUrl.originalUrl,
        shortId: newUrl.shortId,
        clickCount: newUrl.clickCount,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUrlList = async (req: Request, resp: Response) => {
  try {
    const user = req.user;
    const Urls = await Url.find({
      userId: user,
    }).select("originalUrl shortId userId clickCount");

    resp.status(200).json({
      message: "links list fetched successfully",
      urls: Urls.map((url) => {
        const { _id, originalUrl, shortId, userId, clickCount } =
          url.toObject();
        return { id: _id, originalUrl, shortId, userId, clickCount };
      }),
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUrlAnalytics = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  getUrlAnalytics,
  getUrlList,
  shortUrl,
};
