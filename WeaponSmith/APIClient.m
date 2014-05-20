//
//  APIClient.m
//  WeaponSmith
//
//  Created by Ono Masashi on 2014/05/20.
//  Copyright (c) 2014年 akisute. All rights reserved.
//

#import "APIClient.h"

@interface APIClient ()
@property (nonatomic) NSOperationQueue *operationQueue;
@end

@implementation APIClient

+ (instancetype)sharedClient
{
    static id instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.operationQueue = [[NSOperationQueue alloc] init];
    }
    return self;
}

#pragma mark - Private

- (BFTask *)parseResponseDataAsync:(NSData *)responseData
{
    if (responseData.length == 0) {
        return [BFTask taskWithResult:nil];
    }
    NSError *jsonError = nil;
    NSDictionary *jsonObject = [NSJSONSerialization JSONObjectWithData:responseData options:0 error:&jsonError];
    if (jsonError) {
        return [BFTask taskWithError:jsonError];
    }
    if (jsonObject[@"error"]) {
        return [BFTask taskWithError:[NSError errorWithDomain:@"ParseErrorDomain"
                                                         code:[jsonObject[@"code"] integerValue]
                                                     userInfo:@{NSLocalizedDescriptionKey: jsonObject[@"error"]}]];
    }
    return [BFTask taskWithResult:jsonObject];
}

#pragma mark - API

- (BFTask *)getNewWeaponAsync
{
    BFTaskCompletionSource *promise = [BFTaskCompletionSource taskCompletionSource];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.parse.com/1/functions/get_new_weapon"]
                                                           cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                       timeoutInterval:15.0];
    [request setHTTPMethod:@"POST"];
    [request setAllHTTPHeaderFields:@{@"X-Parse-Application-Id": @"bSd79gbuQxsyvL1mEF16i9EB58fxr9wQJmLleSG5",
                                      @"X-Parse-REST-API-Key": @"YrmzQ8SmBwmrwlf4nRzOMeJnHkSXjbmNHb108Ds5",
                                      @"Content-Type": @"application/json"}];
    [request setHTTPBody:[NSJSONSerialization dataWithJSONObject:@{} options:0 error:NULL]];
    [NSURLConnection sendAsynchronousRequest:request
                                       queue:self.operationQueue
                           completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                               if (connectionError) {
                                   [promise setError:connectionError];
                                   return;
                               }
                               
                               NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
                               if (httpResponse.statusCode < 200 || httpResponse.statusCode >= 300) {
                                   [[self parseResponseDataAsync:data] continueWithBlock:^id(BFTask *task) {
                                       NSMutableDictionary *httpErrorInfo = [NSMutableDictionary dictionary];
                                       httpErrorInfo[NSLocalizedDescriptionKey] = [NSHTTPURLResponse localizedStringForStatusCode:httpResponse.statusCode];
                                       if (task.error) {
                                           httpErrorInfo[NSUnderlyingErrorKey] = task.error;
                                       }
                                       [promise setError:[NSError errorWithDomain:@"NSHTTPErrorDomain"
                                                                             code:httpResponse.statusCode
                                                                         userInfo:httpErrorInfo]];
                                       return nil;
                                   }];
                                   return;
                               }
                               
                               [[self parseResponseDataAsync:data] continueWithBlock:^id(BFTask *task) {
                                   if (task.error) {
                                       [promise setError:task.error];
                                       return nil;
                                   }
                                   [promise setResult:task.result];
                                   return nil;
                               }];
                               return;
                           }];
    return promise.task;
}

@end
