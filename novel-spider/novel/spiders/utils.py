import re


def get_web_site(url):
    print(url)
    url = re.search(r'(http.*?://.*?)/.*', url).group(1)
    return url


def filter_null(xpath_list):
    if len(xpath_list) == 0:
        return ""
    return xpath_list[0]


def filter_null2(xpath_list, obj):
    if len(xpath_list) == 0:
        return obj
    return xpath_list[0]


def get_config(website, config_list):
    dd = {}
    for config in config_list:
        if website == config["websiteUrl"]:
            dd = config
    return dd


def get_chapter_url(contentUrl):
    url = re.search(r'(.*/).*', contentUrl).group(1)
    return url


def add_head(head, info):
    if not info.startswith("http"):
        return head + info
    return info


def delete_char(website, preUrl, end):
    if end.startswith("http"):
        return end
    elif end.startswith("/"):
        return website + end
    else:
        return preUrl + end


def strengthen(ztrs):
    return re.sub(r"<br.*?>", "\n", ztrs)


def handleContentUr(contentUrl, url):
    # 截取
    if "index" in url:
        return ""
    contentUrl = re.search(r'(http.*?://.*)/.+', contentUrl).group(1)
    if '/' in url:
        url = re.search(r".*/(.*)", url).group(1)
    return contentUrl + "/" + url


if __name__ == '__main__':
    handleContentUr("https://www.9awx.com/book/76/76302/22208571.html")
