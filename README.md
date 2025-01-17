pointer.gg上现在在进行Learn and Earn的活动。前1000位根据教程创建NFT Lootbox的可以获得5 MATIC和1个NFT的奖励

Pointer给的教程很详细: https://www.pointer.gg/tutorials/thirdweb-nft-lootbox

有时间的朋友可以慢慢阅读学习。想快速通关获得奖励的可以按照我下面的步骤完成


## 设置
~~~
git clone https://github.com/kun-g/EasyLootBox
cd EasyLootBox
npm install
mv .env.example .env
~~~
添加钱包的私钥到.env文件里面的`WALLET_PRIVATE_KEY=`后面

## 初始化
`node 0-prepare-account.js`

执行成功后，会显示Token、User ID、Procject Address，分配复制粘贴到TOKEN、USER_ID、THIRDWEB_PROJECT后面

不放心的话，可以去[Dashboard](https://thirdweb.com/dashboard) 看是否有Project，有的话就成功了。

![Projcet List](./assets/0-ProjectList.png)

## 创建Bundle
`node 1-create-bundle-module.js`

创建成功后，会显示Bundle的合约地址。复制合约地址，黏贴到.env文件里面`BUNDLE_ADDRESS=`后面


![image.png](https://cdn.steemitimages.com/DQmXqrGM2KaCwtcPZtbpcctBX4JMLprShX4zWJBcE5qkTLH/image.png)

## 铸造Bundle
`node 2-mint-bundle-nfts.js`

## 创建卡包
`node 3-create-pack-module.js`

创建成功后，会显示卡包的合约地址。复制合约地址，黏贴到.env文件里面`PACK_ADDRESS=`后面


![image.png](https://cdn.steemitimages.com/DQmZ3trX9JhXr3zXaCD7bNUq7c54GKxfAXzT3ND2Wi7x5cF/image.png)

## 生成卡包
`node 4-create-pack-from-bundle.js`

## 充值LINK
`node 5-deposit-link.js`

## 开包
`node 6-open-pack.js`


开到特斯拉~

![image.png](https://cdn.steemitimages.com/DQmQM2Vwkxj9XgdtbUcr51kr99t7EzbJFhmMSzPGT4gGCvU/image.png)


![image.png](https://cdn.steemitimages.com/DQmVJxZoDUox835VwZ8nU9gn1uV5GP4CeCE9dPwMEF3i9VS/image.png)


## 领奖
用上面创建NFT的钱包登陆教程页面: https://www.pointer.gg/tutorials/thirdweb-nft-lootbox

登陆后，拉到最下面，填入你的Pack的合约地址(就是.env文件里面PACK_ADDRESS那个)，点击验证就完成了~ 奖励5 MATIC和一个NFT。

![image.png](https://cdn.steemitimages.com/DQmRnTDSnGp1a9fCykvCdhQG6xisrEeuAxijy9gpEK6Yawm/image.png)

当然，也有偷懒的方法：

`node 7-submit.js`

我上面写的是快速获得奖励的方法，如果你对创建NFT卡包有兴趣，强力推荐阅读整篇教程，写的挺不错的。
