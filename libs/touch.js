function touch() {
  this.touchStartX = 0;//触摸时的原点
  this.touchStartY = 0;//触摸时的原点 
  this.time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
  this.interval = "";// 记录/清理时间记录 
  this.touchMoveX = 0; // x轴方向移动的距离
  this.touchMoveY = 0; // y轴方向移动的距离
  this.touchStatus = ''
}

// 触摸开始
touch.prototype.touchStart = function (e) {
  this.touchStartX = e.touches[0].pageX
  this.touchStartY = e.touches[0].pageY
  this.interval = setInterval(function () {
    this.time++
  }, 100)
}

// 触摸移动
touch.prototype.touchMove = function (e, callback) {
  this.touchMoveX = e.touches[0].pageX;
  this.touchMoveY = e.touches[0].pageY;
  let moveX = this.touchMoveX - this.touchStartX
  let moveY = this.touchMoveY - this.touchStartY
  if (Math.sign(moveX) === -1) {
    moveX = moveX * -1
  }
  if (Math.sign(moveY) === -1) {
    moveY = moveY * -1
  }
  if (moveX <= moveY) { // 上下滑动
    if (this.touchMoveY - this.touchStartY > 0) {

      return [0, moveY]
    } else {
      return [0, 0]
    }
  } else { // 左右滑动
    // return [moveX, 0]
    return [0, 0]
  }
}

// 触摸结束
touch.prototype.touchEnd = function (e) {
  if (this.touchMoveX === 0 && this.touchMoveY === 0) {
    return [0, 0]
  }
  let moveX = this.touchMoveX - this.touchStartX
  let moveY = this.touchMoveY - this.touchStartY
  console.log(moveX, '-----', moveY)
  if (Math.sign(moveX) === -1) {
    moveX = moveX * -1
  }
  if (Math.sign(moveY) === -1) {
    moveY = moveY * -1
  }
  console.log(moveX, '========', moveY)
  let resArr = [0, 0]
  if (moveX <= moveY) { // 上下滑动
    // 向上滑动
    if (this.touchMoveY - this.touchStartY <= -10 && this.time < 10) {
      console.log("向上滑动")
      resArr = [0, 0]
    }
    // 向下滑动 
    if (this.touchMoveY - this.touchStartY >= 10 && this.time < 10) {
      console.log("向下滑动");
      resArr = [0, moveY]
    }
  } else { // 左右滑动
    // 向左滑动
    if (this.touchMoveX - this.touchStartX <= -10 && this.time < 10) {
      console.log("左滑页面")
      resArr = [0, 0]
    }
    // 向右滑动 
    if (this.touchMoveX - this.touchStartX >= 10 && this.time < 10) {
      console.log("向右滑动");
    }
    resArr = [0, 0]
  }
  return this.getTouchStatus(resArr)
  // clearInterval(this.interval); // 清除setInterval 
  // this.time = 0;
}

touch.prototype.getTouchStatus = function (resArr) {
  clearInterval(this.interval); // 清除setInterval 
  this.time = 0;
  this.touchMoveX = 0
  this.touchMoveY = 0
  return resArr
}

module.exports = new touch()