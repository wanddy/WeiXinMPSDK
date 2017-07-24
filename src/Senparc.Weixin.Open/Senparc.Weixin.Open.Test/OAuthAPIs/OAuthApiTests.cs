using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senparc.Weixin.HttpUtility;
using Senparc.Weixin.Open.OAuthAPIs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senparc.Weixin.Open.OAuthAPIs.Tests
{
    [TestClass()]
    public class OAuthApiTests
    {
        [TestMethod()]
        public void GetAuthorizeUrlTest()
        {
            var returnUrl = "http://zs.sasu.edu.cn?a=1&b=a";
            var result = OAuthAPIs.OAuthApi.GetAuthorizeUrl("appId", "componentAppId", returnUrl, "Jeffrey Su", new[] { OAuthScope.snsapi_userinfo });

            Console.WriteLine(result);
            Assert.IsTrue(result.Contains("redirect_uri=http%3A%2F%2Fzs.sasu.edu.cn%3Fa%3D1%26b%3Da"));

        }
    }
}